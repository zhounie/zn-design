import path from 'path'
import { parallel, series } from 'gulp'
import { mkdir, copyFile } from 'fs/promises'
import { copy } from 'fs-extra'
import { buildOutput, epOutput, projectRoot } from '@iszhounie/build-utils'
import { run, withTaskName, runTask, buildConfig } from './src'
import type { TaskFunction } from 'gulp'
import type { Module } from './src'


const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types')
  const copyTypes = (module: Module) => {
    return withTaskName(`copyTypes:${module}`, () => {
      return copy(src, buildConfig[module].output.path, { recursive: true })
    })
  }
  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

// 拷贝文件制dist/zn-design
const copyFiles = () => {
  return Promise.all([
    copyFile(
      path.resolve(projectRoot, 'README.md'),
      path.resolve(epOutput, 'README.md')
    )
  ])
}

const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(epOutput, 'theme-chalk/index.css'),
    path.resolve(epOutput, 'dist/index.css')
  )
}


export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  // 创建文件夹
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
    runTask('buildHelper'),
    series(
      withTaskName('buildThemeChalk', () => {
        return run('pnpm run --filter ./packages/theme-chalk build --parallel')
      }),
      copyFullStyle
    )
  ),

  parallel(
    copyTypesDefinitions,
    copyFiles
  )
)

// 导出全部方法，run方法调用。
export * from './src'