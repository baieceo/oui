// oui/packages/toast/index.js
const default_data = {
  visible: false,
  content: '',
  icon: '',
  image: '',
  size: 100,
  duration: 2,
  mask: true,
  type: 'default'  // default || success || warning || error || loading
}

let timer = null

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    ...default_data
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleShow (options) {
      const { type = 'default', duration = 2 } = options

      this.setData({
        ...options,
        type,
        duration,
        visible: true
      })

      const delay = this.data.duration * 1000

      if (timer) clearTimeout(timer)

      if (delay !== 0) {
        timer = setTimeout(() => {
          this.handleHide()
          timer = null
        }, delay)
      }
    },
    handleHide() {
      this.setData({
        ...default_data
      })
    }
  }
})
