
/**
 * Options for angle.js compilation and translation. The default values are the
 * minimums required by the OpenGL ES 2.0 specification. Override the defaults
 * if your hardware has more capabilities (or extensions) than are required.
 * Descriptions are from
 * http://www.khronos.org/opengles/sdk/docs/man/xhtml/glGet.xml.
 *
 * OpenGL ES 3.0 descriptions are not yet supported, but are from:
 * http://www.khronos.org/opengles/sdk/docs/man3/html/glGet.xhtml
 *
 * @interface
 */
function TranslatorOptions() {}

// TODO(bckenny): GLSL ES 3.0 constants.
// TranslatorOptions.prototype.maxVertexOutputVectors;
// TranslatorOptions.prototype.maxFragmentInputVectors;
// TranslatorOptions.prototype.minProgramTexelOffset;
// TranslatorOptions.prototype.maxProgramTexelOffset;

// TODO(bckenny): compile-specific options
// TranslatorOptions.prototype.shaderType;
// TranslatorOptions.prototype.outputCodeType;
// TranslatorOptions.prototype.specType;

/**
 * The maximum number of four-component generic vertex attributes accessible to
 * a vertex shader. See GL_MAX_VERTEX_ATTRIBS.
 * 
 * The default value is 8.
 * @type {number}
 */
TranslatorOptions.prototype.maxVertexAttribs;

/**
 * The maximum number of four-element floating-point, integer, or boolean
 * vectors that can be held in uniform variable storage for a vertex shader.
 * See GL_MAX_VERTEX_UNIFORM_VECTORS.
 * 
 * The default value is 128.
 * @type {number}
 */
TranslatorOptions.prototype.maxVertexUniformVectors;

/**
 * The maximum number of four-element floating-point vectors available for
 * interpolating varying variables used by vertex and fragment shaders. Varying
 * variables declared as matrices or arrays will consume multiple
 * interpolators. See GL_MAX_VARYING_VECTORS.
 * 
 * The default value is 8.
 * @type {number}
 */
TranslatorOptions.prototype.maxVaryingVectors;

/**
 * The maximum supported texture image units that can be used to access texture
 * maps from the vertex shader. See GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS.
 * 
 * The default value is 0.
 * @type {number}
 */
TranslatorOptions.prototype.maxVertexTextureImageUnits;

/**
 * The maximum supported texture image units that can be used to access texture
 * maps from the vertex shader and the fragment processor combined. See
 * GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS.
 * 
 * The default value is 8.
 * @type {number}
 */
TranslatorOptions.prototype.maxCombinedTextureImageUnits;

/**
 * The maximum supported texture image units that can be used to access texture
 * maps from the fragment shader. See GL_MAX_TEXTURE_IMAGE_UNITS.
 * 
 * The default value is 8.
 * @type {number}
 */
TranslatorOptions.prototype.maxTextureImageUnits;

/**
 * The maximum number of four-element floating-point, integer, or boolean
 * vectors that can be held in uniform variable storage for a fragment shader.
 * See GL_MAX_FRAGMENT_UNIFORM_VECTORS.
 * 
 * The default value is 16.
 * @type {number}
 */
TranslatorOptions.prototype.maxFragmentUniformVectors;

/**
 * The maximum number of simultaneous outputs that may be written in a fragment
 * shader. See GL_MAX_DRAW_BUFFERS in the OpenGL ES 3.0 specification. The
 * default value will be 4 in OpenGL ES 3.0.
 * 
 * The default value is 1.
 * @type {number}
 */
TranslatorOptions.prototype.maxDrawBuffers;

/**
 * Option to enable OES_standard_derivatives extension support. See
 * http://www.khronos.org/registry/webgl/extensions/OES_standard_derivatives/
 * (WebGL) and
 * http://www.khronos.org/registry/gles/extensions/OES/OES_standard_derivatives.txt
 * (OpenGL ES 2.0) for details.
 *
 * The default value is false.
 * @type {boolean}
 */
TranslatorOptions.prototype.oesStandardDerivatives;

/**
 * Option to enable OES_EGL_image_external extension support. See
 * https://www.khronos.org/registry/gles/extensions/OES/OES_EGL_image_external.txt
 * for details.
 *
 * The default value is false.
 * @type {boolean}
 */
TranslatorOptions.prototype.oesEglImageExternal;

/**
 * Option to enable GL_ARB_texture_rectangle extension support. See
 * http://www.opengl.org/registry/specs/ARB/texture_rectangle.txt
 * for details.
 *
 * The default value is false.
 * @type {boolean}
 */
TranslatorOptions.prototype.arbTextureRectangle;

/**
 * Option to enable GL_EXT_draw_buffers extension support. See
 * http://www.khronos.org/registry/gles/extensions/EXT/EXT_draw_buffers.txt
 * for details.
 *
 * The default value is false.
 * @type {boolean}
 */
TranslatorOptions.prototype.extDrawBuffers;

/**
 * Option to enable EXT_frag_depth extension support. See
 * http://www.khronos.org/registry/webgl/extensions/EXT_frag_depth/ (WebGL) and
 * https://www.khronos.org/registry/gles/extensions/EXT/EXT_frag_depth.txt
 * (OpenGL ES 2.0) for details.
 *
 * The default value is false.
 * @type {boolean}
 */
TranslatorOptions.prototype.extFragDepth;

/**
 * Option to enable EXT_shader_texture_lod extension support. See
 * http://www.khronos.org/registry/webgl/extensions/EXT_shader_texture_lod/
 * (WebGL) and
 * http://www.khronos.org/registry/gles/extensions/EXT/EXT_shader_texture_lod.txt
 * (OpenGL ES 2.0) for details.
 *
 * The default value is false.
 * @type {boolean}
 */
TranslatorOptions.prototype.extShaderTextureLod;

/**
 * Fragment shaders are only required to support the mediump qualifier for the
 * range and precision of floating-point and integer types and this is enforced
 * in the validator. Set to true to allow highp precision in fragment shaders.
 * See OpenGL ES 2.0 §4.5.2 - Precision Qualifiers.
 *
 * The default value is false.
 * @type {boolean}
 */
TranslatorOptions.prototype.fragmentPrecisionHigh;
