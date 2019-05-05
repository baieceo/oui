// oui/packages/picker/index.js
const { emitter } = require('../base/events.js')

Component({
  externalClasses: ['o-class', 'oui-class'],
  behaviors: ['wx://form-field'],
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '请选择'
    },
    label: {
      type: String,
      value: ''
    }
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
    handleItemClick (event) {
      // emitter(this, ['tap'], event)
    }
  }
})
