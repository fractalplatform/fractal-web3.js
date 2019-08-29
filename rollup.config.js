// eslint-disable-next-line unicorn/filename-case
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import autoExternal from 'rollup-plugin-auto-external';
import cleanup from 'rollup-plugin-cleanup';

const config = [
    {
        input: './index.js',
        output: [
            {
                file: '',
                format: 'cjs'
            },
            {
                name: '',
                file: '',
                format: 'umd',
                globals: {}
            }
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                babelrc: false,
                runtimeHelpers: true,
                presets: [
                    [
                        '@babel/env',
                        {
                            modules: false,
                            targets: {
                                node: '8',
                                browsers: 'last 2 versions'
                            }
                        }
                    ]
                ],
                plugins: [
                    '@babel/plugin-proposal-export-default-from',
                    '@babel/plugin-proposal-export-namespace-from',
                    [
                        '@babel/plugin-transform-runtime',
                        {
                            helpers: true,
                            regenerator: true
                        }
                    ]
                ]
            }),
            json(),
            autoExternal(),
            cleanup()
        ]
    }
];

export default () => {
    // CJS
    config[0].output[0].file = 'dist/index.cjs.js';

    // UMD
    config[0].output[1].name = 'uranus';
    config[0].output[1].file = 'dist/index.umd.js';

    // ESM
    config[1] = {
        input: './index.js',
        output: [
            {
                file: 'dist/index.esm.js',
                format: 'es'
            }
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                plugins: ['@babel/plugin-proposal-export-default-from', '@babel/plugin-proposal-export-namespace-from']
            }),
            json(),
            autoExternal(),
            cleanup()
        ]
    };

    return config;
};
