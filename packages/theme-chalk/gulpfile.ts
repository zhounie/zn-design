import path from 'path'
import chalk from 'chalk'
import { epOutput } from '@iszhounie/build-utils'
import { dest, parallel, series, src } from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import consola from 'consola'
import rename from 'gulp-rename'


const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(epOutput, 'theme-chalk')

function buildThemeChalk() {
    const sass = gulpSass(dartSass)
    
    return src(path.resolve(__dirname, 'src/*.scss'))
        .pipe(sass.sync())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(
            cleanCSS({}, (details) => {
                consola.success(
                    `${chalk.cyan(details.name)}: ${chalk.yellow(
                        details.stats.originalSize / 1000
                    )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
                )
            })
        )
        .pipe(dest(distFolder))
}

export function copyThemeChalkBundle() {
    return src(`${distFolder}/**`).pipe(dest(distBundle))
}

export function copyThemeChalkSource() {
    return src(path.resolve(__dirname, 'src/**')).pipe(
        dest(path.resolve(distBundle, 'src'))
    )
}

export const build = parallel(
    copyThemeChalkSource,
    series(
        buildThemeChalk,
        copyThemeChalkBundle
    )
)

export default build