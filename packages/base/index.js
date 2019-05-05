function getCtx(selector) {
  const pages = getCurrentPages()
  const ctx = pages[pages.length - 1]

  const component = ctx.selectComponent(selector)

  if (!component) {
    console.error('无法找到对应的组件，请按文档说明使用组件')
    return null
  }
  return component
}

function getComponengt(selector, ctx) {
  return ctx.selectComponent(selector)
}

function Toast(options) {
  const { selector = '#toast' } = options
  const ctx = getCtx(selector)

  ctx.handleShow(options)
}

Toast.hide = function (selector = '#toast') {
  const ctx = getCtx(selector)

  ctx.handleHide()
}

module.exports = {
  $toast: Toast,
  $refs: getComponengt,
  $ctx: getCtx
}