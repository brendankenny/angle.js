//
// Copyright 2014 Google Inc. All rights reserved.
// 
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file or at
// https://developers.google.com/open-source/licenses/bsd

// Modified from code Copyright 2002-2013 The ANGLE Project Authors
// see angle/samples/translator/translator.cpp for original

#include "GLSLANG/ShaderLang.h"

#include <stdlib.h>

// Return codes from compilation attempt.
enum TFailCode {
    ESuccess = 0,
    EFailUsage,
    EFailCompile,
    EFailCompilerCreate,
};

// Sets up the per compile resources.
void GenerateResources(ShBuiltInResources* resources) {
    ShInitBuiltInResources(resources);

    resources->MaxVertexAttribs = 8;
    resources->MaxVertexUniformVectors = 128;
    resources->MaxVaryingVectors = 8;
    resources->MaxVertexTextureImageUnits = 0;
    resources->MaxCombinedTextureImageUnits = 8;
    resources->MaxTextureImageUnits = 8;
    resources->MaxFragmentUniformVectors = 16;
    resources->MaxDrawBuffers = 1;

    resources->OES_standard_derivatives = 0;
    resources->OES_EGL_image_external = 0;
}

// Prevent name mangling for easy emscripten linking.
extern "C" {

// Attempts to compile a fragment shader and returns the error log (if any) and
// translated shader code (if successful).
// TODO(bckenny): all the options
int TranslateShader(const char* src, char** errorLog, char** translatedCode) {
  TFailCode failCode = ESuccess;
  // TODO(bckenny): expand fail usage checking

	int compileOptions = 0;
	ShHandle compiler = 0;

	char* buffer = 0;
	size_t bufferLen = 0;
	ShShaderSpec spec = SH_GLES2_SPEC;
  ShShaderOutput output = SH_HLSL11_OUTPUT; // SH_ESSL_OUTPUT

  ShInitialize();

  ShBuiltInResources resources;
  GenerateResources(&resources);

  // resources.FragmentPrecisionHigh = 1;
  compileOptions |= SH_OBJECT_CODE;

  compiler = ShConstructCompiler(SH_FRAGMENT_SHADER, spec, output,
  															 &resources);

  if (compiler) {
    int compiled = ShCompile(compiler, &src, 1, compileOptions);

    // get error log
    ShGetInfo(compiler, SH_INFO_LOG_LENGTH, &bufferLen);
    if (bufferLen > 1) {
      buffer = (char*) malloc(bufferLen * sizeof(char));
      ShGetInfoLog(compiler, buffer);
      *errorLog = buffer;
    }

    if (compiled) {
      // on successful compilation, retrieve translated code
      ShGetInfo(compiler, SH_OBJECT_CODE_LENGTH, &bufferLen);
      if (bufferLen > 1) {
        buffer = (char*) malloc(bufferLen * sizeof(char));
        ShGetObjectCode(compiler, buffer);
        *translatedCode = buffer;
      }

    } else {
      failCode = EFailCompile;
    }

    ShDestruct(compiler);
  } else {
    // TODO(bckenny): when does this happen?
    failCode = EFailCompilerCreate;
  }

  ShFinalize();

  return failCode;
}
}
