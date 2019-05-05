const emitter = (ctx, events = [], detail = {}, options = {}) => {
  events.forEach(type => {
    ctx.triggerEvent(
      type,
      detail,
      options
    )
  })
}

module.exports = {
  emitter
}