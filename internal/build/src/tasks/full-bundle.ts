
import path from 'path'
import { parallel } from 'gulp'
import glob from 'fast-glob'
import { rollup } from 'rollup'

import { epOutput, epRoot, localeRoot } from '@iszhounie/build-utils'

import { PKG_BRAND_NAME } from '@iszhounie/build-constants'
import { version } from '../../../../packages/zn-design/version'
import {
    formatBundleFilename,
    generateExternal,
    withTaskName,
    writeBundles
} from '../utils'


// rollup 用到的插件
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'

import { target } from '../build-info'

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`

async function buildFullEntry(minify) {
    const bundle = await rollup({
        input: path.resolve(epRoot, 'index.ts'),
        plugins: [
            vue({
                isProduction: true
            }),
            vueJsx(),
            nodeResolve({
                extensions: ['.mjs', '.js', '.json', '.ts']
            }),
            commonjs(),
            esbuild({
                exclude: [],
                minify,
                sourceMap: minify,
                target,
                loaders: {
                    '.vue': 'ts'
                },
                define: {
                    'process.env.NODE_ENV': JSON.stringify('production')
                }
            })
        ],
        external: await generateExternal({full: true})
    })
    await writeBundles(bundle, [
        {
            format: 'umd',
            file: path.resolve(
                epOutput,
                'dist',
                formatBundleFilename('index.full', minify, 'js')
            ),
            exports: 'named',
            name: 'ZnDesign',
            globals: {
                vue: 'Vue'
            },
            sourcemap: minify,
            banner
        }, {
            format: 'esm',
            file: path.resolve(
                epOutput,
                'dist',
                formatBundleFilename('index.full', minify, 'mjs')
            ),
            sourcemap: minify,
            banner
        }
    ])
}

async function buildFullLocale(minify) {
    const files = await glob(`${path.resolve(localeRoot, 'lang')}/*.ts`, {
        absolute: true
    })
    
    return Promise.all(
        files.map(async (file) => {
            console.log(file);
            
        })
    )
}

export const buildFull = (minify: boolean) => {
    return async () => {
        return Promise.all([buildFullEntry(minify), buildFullLocale(minify)])
    }
}

export const buildFullBundle = parallel(
    withTaskName('buildFullMinified', buildFull(true)),
    withTaskName('buildFull', buildFull(false))
)