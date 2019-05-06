// oui/packages/button/index.js
Component({
  externalClasses: ['o-class', 'oui-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    // default, primary, ghost, info, success, warning, error
    type: {
      type: String,
      value: '',
    },
    inline: {
      type: Boolean,
      value: false
    },
    // default, large, small
    size: {
      type: String,
      value: 'default',
    },
    // circle, square
    shape: {
      type: String,
      value: 'square'
    },
    ghost: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    long: {
      type: Boolean,
      value: false
    },
    openType: String,
    appParameter: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    },
    formType: {
      type: String,
      value: ''
    },
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap () {
      if (this.data.disabled || this.data.loading) return false

      this.triggerEvent('click')
    }
  }
})
