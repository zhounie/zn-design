import { parallel, series } from 'gulp'
import { mkdir } from 'fs/promises'
import { eqOutput } from '@iszhounie/build-utils'

const withTackName = (name, fn) => {
  return Object.assign(fn, {
    displayName: name
  })
}

export default series(
  // withTackName('clean', () => {}),
  withTackName('createOutput', () => {
    return mkdir(eqOutput, { recursive: true })
  }),

  parallel()
)
