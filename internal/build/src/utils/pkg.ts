
import { buildConfig } from '../build-info'
import type { Module } from '../build-info'
import { PKG_PREFIX } from '@iszhounie/build-constants'

export const pathRewriter = (module: Module) => {
    const config = buildConfig[module]
    
    return (id: string) => {
        id = id.replaceAll(`${PKG_PREFIX}/theme-chalk`, 'zn-design/theme-chalk')
        id = id.replaceAll(`${PKG_PREFIX}/`, `${config.bundle.path}/`)
        return id
    }
}