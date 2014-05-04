{
    'variables':
    {
        'angle_path': '../angle',

        'gcc_or_clang_warnings':
        [
            '-Wall',
            '-Wchar-subscripts',
            '-Werror',
            '-Wextra',
            '-Wformat=2',
            '-Winit-self',
            '-Wno-sign-compare',
            '-Wno-unused-function',
            '-Wno-unused-parameter',
            '-Wno-unknown-pragmas',
            '-Wpacked',
            '-Wpointer-arith',
            '-Wundef',
            '-Wwrite-strings',
            '-Wno-reorder',
            '-Wno-format-nonliteral',

            # NOTE: hack around error for unused mShaderType in
            # src/compiler/translator/VersionGLSL.h/cpp
            # see: https://code.google.com/p/angleproject/issues/detail?id=638
            '-Wno-unused-private-field',
        ],
    },

    'target_defaults':
    {
        # output of build is LLVM bitcode, not js, so default -Os
        'default_configuration': 'Release',
    },

    'targets':
    [
        {
            'target_name': 'translator',
            'type': 'executable',
            'include_dirs':
            [
                '<(angle_path)/include',
                '<(angle_path)/src'
            ],
            'sources':
            [
                '<!@(python <(angle_path)/enumerate_files.py \
                     -dirs <(angle_path)/src/compiler/preprocessor \
                     <(angle_path)/src/compiler/translator \
                     <(angle_path)/src/third_party/compiler \
                     <(angle_path)/src/common \
                     <(angle_path)/include \
                     -types *.cpp *.h *.y *.l)',

                '../src/translator.cpp',
            ],
            'defines':
            [
                # NOTE: ugly hack to get out of explicit enumeration of
                # supported platforms in src/compiler/translator/osinclude.h
                '__linux__'
            ],
            'conditions':
            [
                ['OS != "win"',
                {
                    'sources/': [ [ 'exclude', 'compiler/translator/ossource_win.cpp' ], ],
                    'cflags': [ '-fPIC' ],
                    'configurations':
                    {
                        'Debug': { 'defines': [ '_DEBUG' ] },
                        'Release': { 'defines': [ 'NDEBUG' ] },
                    },
                }],

                ['OS == "mac"',
                {
                    'xcode_settings':
                    {
                        # Without this, xcode_emulation default is -gdwarf-2,
                        # which isn't supported by emscripten.
                        'GCC_GENERATE_DEBUGGING_SYMBOLS': 'NO',

                        # NOTE: hack around required -arch flag in generated
                        # makefile due to behavior of gyp's xcode_emulation.py,
                        # which throws an error in emscripten's emcc when it
                        # reaches the next token. see:
                        # https://code.google.com/p/gyp/issues/detail?id=260
                        # https://code.google.com/p/gyp/issues/detail?id=355
                        'ARCHS': [ '' ],

                        'WARNING_CFLAGS':
                        [
                            # NOTE: ignored for lack of an -arch argument (see above).
                            '-Wnot-a-real-arch',

                            # NOTE: hack around error for unused -arch (see above).
                            '-Qunused-arguments',

                            '<@(gcc_or_clang_warnings)',
                        ]
                    },
                    'configurations':
                    {
                        'Debug':
                        {
                            'xcode_settings':
                            {
                                'COPY_PHASE_STRIP': 'NO',
                                'GCC_OPTIMIZATION_LEVEL': '0',
                            },
                        }
                    },
                }],

                ['OS != "win" and OS != "mac"',
                {
                    'cflags': [
                        '<@(gcc_or_clang_warnings)',
                        '-pthread',
                        '-fno-exceptions',
                    ],
                    'ldflags': [ '-pthread', ],
                    'configurations':
                    {
                        'Debug':
                        {
                            'variables': { 'debug_optimize%': '0' },
                            'cflags':
                            [
                                '-O>(debug_optimize)',
                                '-g',
                            ],
                        }
                    },
                }],
            ],
        },
    ],
}