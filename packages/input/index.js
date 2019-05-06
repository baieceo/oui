// oui/packages/input/index.js
Component({
  externalClasses: ['o-class', 'oui-class'],
  behaviors: ['wx://form-field'],
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: ''
    },
    // text || textarea || password || number
    type: {
      type: String,
      value: 'text'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: '请输入'
    },
    autofocus: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: -1
    },
    placeholderColor: {
      type: String,
      value: '#979797'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInputChange (event) {
      const { detail = {} } = event
      const { value = '' } = detail
      
      this.setData({ value })

      this.triggerEvent('change', event.detail)
      
      // 用于双向绑定
      this.triggerEvent(
        'sync',
        { event, value },
        { bubbles: true, composed: true, source: 'input' }
      )

      this.triggerEvent(
        'input',
        { event, value },
        { bubbles: true, composed: true, source: 'input' }
      )

      this.triggerEvent(
        'update',
        { event, value },
        { bubbles: true, composed: true, source: 'input' }
      )
    },

    handleInputFocus (ev) {
      this.triggerEvent('focus', ev)
    },

    handleInputBlur (ev) {
      this.triggerEvent('blur', ev)
    }
  },
  ready () {
    this.triggerEvent('change', { value: this.data.value })
  }
})
