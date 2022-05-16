import { epOutput } from '@iszhounie/build-utils'
import path from 'path'
import { PKG_NAME } from '@iszhounie/build-constants'

import type { ModuleFormat } from 'rollup'

export const modules = ['esm', 'cjs'] as const
export type Module = typeof modules[number]

export interface BuildInfo {
    module: 'ESNext' | 'CommonJS',
    format: ModuleFormat,
    ext: 'mjs' | 'cjs' | 'js',
    output: {
        name: string,
        path: string
    },
    bundle: {
        path: string
    }
}

export const buildConfig: Record<Module, BuildInfo> = {
    esm: {
        module: "ESNext",
        format: 'esm',
        ext: 'mjs',
        output: {
            name: 'es',
            path: path.resolve(epOutput, 'es')
        },
        bundle: {
            path: `${PKG_NAME}/es`
        }
    },
    cjs: {
        module: 'CommonJS',
        format: 'cjs',
        ext: 'cjs',
        output: {
            name: 'lib',
            path: path.resolve(epOutput, 'lib')
        },
        bundle: {
            path: `${PKG_NAME}/lib`
        }
    }
}

export const buildConfigEntries = Object.entries(buildConfig)

export const target = 'es2018'