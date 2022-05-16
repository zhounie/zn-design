import { Project } from 'ts-morph'
import path from 'path'
import {
    buildOutput,
    projectRoot,
    excludeFiles,
    pkgRoot,
    epRoot
} from '@iszhounie/build-utils'
import glob from 'fast-glob'
import fs from 'fs/promises'
import * as vueCompiler from 'vue/compiler-sfc'

import typeSafe from '../type-safe.json'

import consola from 'consola'
import chalk from 'chalk'

import type { SourceFile } from 'ts-morph'
import { pathRewriter } from '../utils/pkg'


const TSCONFIG_PATH = path.resolve(projectRoot, 'tsconfig.web.json')

const typeSafePaths = typeSafe.map(_path => {
    let safePath = path.resolve(projectRoot, _path)
    if (_path.endsWith('/')) {
        safePath += path.sep
    }
    return safePath
})

export const generateTypesDefinitions = async () => {
    
    const project = new Project({
        compilerOptions: {
            emitDeclarationOnly: true,
            outDir: path.resolve(buildOutput, 'types'),
            baseUrl: projectRoot,
            paths: {
                '@zn-design/*': ['packages/*']
            },
            preserveSymlinks: true,
            types: [
                path.resolve(projectRoot, 'typings/env'),
            ]
        },
        tsConfigFilePath: TSCONFIG_PATH,
        skipAddingFilesFromTsConfig: true
    })

    const globAnyFile = '**/*.{js?(x),ts?(x),vue}'
    const filePaths = excludeFiles(
        await glob([globAnyFile, '!zn-design/**/*'], {
            cwd: pkgRoot,
            absolute: true,
            onlyFiles: true
        })
    )
    const epPaths = excludeFiles(
        await glob(globAnyFile, {
            cwd: epRoot,
            onlyFiles: true
        })
    )
    const sourceFiles: SourceFile[] = []
    await Promise.all([
        ...filePaths.map(async (file) => {
            if (file.endsWith('.vue')) {
                const content = await fs.readFile(file, 'utf-8')
                const sfc = vueCompiler.parse(content)
                const { script, scriptSetup } = sfc.descriptor
                if (script || scriptSetup) {
                    let content = script?.content ?? ''
                    if (scriptSetup) {
                        const compiled = vueCompiler.compileScript(sfc.descriptor, {
                            id: 'xxx'
                        })
                        content += compiled.content
                    }
                    
                    const lang = scriptSetup?.lang || script?.lang || 'js'
                    const sourceFile = project.createSourceFile(
                        `${path.relative(process.cwd(), file)}.${lang}`,
                        content
                    )
                    sourceFiles.push(sourceFile)
                }
            } else {
                const sourceFile = project.addSourceFileAtPath(file)
                sourceFiles.push(sourceFile)
            }
        }),
        ...epPaths.map(async (file) => {
            const content = await fs.readFile(path.resolve(epRoot, file), 'utf-8')
            sourceFiles.push(
                project.createSourceFile(path.resolve(pkgRoot, file), content)
            )
        })
    ])
    
    const diagnostics = project.getPreEmitDiagnostics().filter((diagnostic) => {
        const filePath = diagnostic.getSourceFile()?.getFilePath()
        return (
            filePath &&
            typeSafePaths.some(safePath => filePath.startsWith(safePath))
        )
    })
    if (diagnostics.length > 0) {
        consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
        const err = new Error('生成 .d.ts 失败。')
        consola.error(err)
        throw err
    }

    await project.emit({
        emitOnlyDtsFiles: true
    })

    const tasks = sourceFiles.map(async (sourceFile) => {
        const relativePath = path.relative(pkgRoot, sourceFile.getFilePath())
        consola.trace(
            chalk.yellow(
                `生成文件定义: ${chalk.bold(relativePath)}`
            )
        )
        const emitOutput = sourceFile.getEmitOutput()
        const emitFiles = emitOutput.getOutputFiles()
        if (emitFiles.length === 0) {
            throw new Error(`没有 Emit 文件 ${chalk.bold(relativePath)}`)
        }

        const tasks = emitFiles.map(async (outputFile) => {
            const filePath = outputFile.getFilePath()
            await fs.mkdir(path.dirname(filePath), {
                recursive: true
            })

            await fs.writeFile(
                filePath,
                pathRewriter('esm')(outputFile.getText()),
                'utf-8'
            )

            consola.success(
                chalk.green(
                    `生成定义文件：${chalk.bold(relativePath)} 成功`
                )
            )
        })
        await Promise.all(tasks)
    })
    await Promise.all(tasks)
}