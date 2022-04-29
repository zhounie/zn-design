import ZnButton from './button'

export * from './button'

const components = [ZnButton]

const install = (app) => {
  Object.keys(components).forEach((com) => {
    app.use(components[com])
  })
}

export default {
  install
}
