// oui/packages/date-picker/index.js
Component({
  externalClasses: ['o-class', 'oui-class'],
  behaviors: ['wx://form-field'],
  /**
   * 组件的属性列表
   */
  properties: {
    startDate: {
      type: String,
      value: ''
    },
    endDate: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请选择'
    },
    value: {
      type: String,
      value: '',
      observer: 'changeValue'
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange (event) {
      const { detail = {} } = event
      const { value = '' } = detail

      this.setData({
        date: value
      })

      this.setData({
        value
      })
      
      // 用于双向绑定
      this.triggerEvent(
        'sync',
        { event, value, source: 'date-picker' },
        { bubbles: true, composed: true }
      )

      this.triggerEvent(
        'input',
        { event, value, source: 'date-picker' },
        { bubbles: true, composed: true }
      )

      this.triggerEvent(
        'update',
        { event, value, source: 'date-picker' },
        { bubbles: true, composed: true }
      )
    },
    changeValue (date) {
      this.setData({
        date
      })
    }
  }
})
