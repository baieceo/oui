// oui/packages/panel/index.js
Component({
  externalClasses: ['o-class', 'oui-class'],
  options: {
    multipleSlots: true,
    styleIsolation: 'isolated'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    extra: {
      type: String,
      value: ''
    },
    width: {
      type: String,
      value: '640rpx'
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

  }
})
