import { resolve } from 'path'

export const projectRoot = resolve(__dirname, '..', '..', '..')


export const pkgRoot = resolve(projectRoot, 'packages')

export const localeRoot = resolve(pkgRoot, 'locale')

export const buildRoot = resolve(projectRoot, 'internal', 'build')

export const buildOutput = resolve(projectRoot, 'dist')


export const epRoot = resolve(pkgRoot, 'zn-design')

export const epOutput = resolve(buildOutput, 'zn-design')

export const epPackage = resolve(epRoot, 'package.json')