import { rollup } from 'rollup'
import { epRoot, excludeFiles, pkgRoot } from '@iszhounie/build-utils'
import glob from 'fast-glob'
import { generateExternal, writeBundles } from '../utils'
import { buildConfigEntries, target } from '../build-info'
import consola from 'consola'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import type { OutputOptions } from 'rollup'


export const buildModules = async () => {
    const input = excludeFiles(await glob('**/*.{js,ts,vue}', {
        cwd: pkgRoot,
        absolute: true,
        onlyFiles: true
    }))
    
    const bundle = await rollup({
         input,
         plugins: [
            vue({
                isProduction: false
            }),
            vueJsx(),
            nodeResolve({
                extensions: ['.mjs', '.js', '.json', '.ts']
            }),
            commonjs(),
            esbuild({
                sourceMap: true,
                target,
                loaders: {
                    '.vue': 'ts'
                }
            })
         ],
         external: await generateExternal({full: false}),
         treeshake: false
    })
    await writeBundles(
        bundle,
        buildConfigEntries.map(([module, config]): OutputOptions => {
            return {
                format: config.format,
                dir: config.output.path,
                exports: module === 'cjs' ? 'named' : undefined,
                preserveModules: true,
                preserveModulesRoot: epRoot,
                sourcemap: true,
                entryFileNames: `[name].${config.ext}`
            }
        })
    ) 
}