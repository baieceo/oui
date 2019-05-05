// oui/packages/form-item/index.js
Component({
  options: {
    styleIsolation: 'isolated'
  },
  relations: {
    '../form/index': {
      type: 'parent',
      linked (target) {
        this.change()
      },
      linkChanged (target) {
        this.change()
      },
      unlinked (target) {
        this.change()
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    prop: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    labelWidth: {
      type: String,
      value: ''
    },
    labelPosition: {
      type: String,
      value: 'right'
    },
    index: {
      type: Number,
      value: Infinity
    },
    prop: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    labelWidthDefault: '110px'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change (event) {

    },
    handleInput (event) {
      event = event.detail.event

      const { detail = {} } = event
      const { value = '' } = detail
      const prop = this.data.prop

      this.triggerEvent(
        'sync',
        { event, value, prop, source: 'form-item' },
        { bubbles: true, composed: true, capturePhase: false }
      )

      this.triggerEvent(
        'input',
        { event, value, prop, source: 'form-item' },
        { bubbles: true, composed: true, capturePhase: false }
      )

      this.triggerEvent(
        'update',
        { event, value, prop, source: 'form-item' },
        { bubbles: true, composed: true, capturePhase: false }
      )
    }
  }
})
