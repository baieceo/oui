// oui/packages/form/index.js
Component({
  externalClasses: ['o-class', 'oui-class'],
  options: {
    styleIsolation: 'isolated'
  },
  relations: {
    '../form-item/index': {
      type: 'child',
      linked (target) {
        this.changeItem(target)
      },
      linkChanged (target) {
        this.changeItem(target)
      },
      unlinked (target) {
        this.changeItem(target)
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    model: {
      type: Object,
      value: {},
      observer: 'changeData'
    },
    value: {
      type: Object,
      value: {},
      observer: 'changeData'
    },
    labelWidth: {
      type: String,
      value: ''
    },
    labelPosition: {
      type: String,
      value: 'right'
    },
    rules: {
      type: Object,
      value: {}
    },
    modelName: {
      type: String,
      value: ''
    },
    valueName: {
      type: String,
      value: ''
    },
    validateType: {
      type: String,
      value: 'boolean'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: {},
    initData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeItem (target) {
      let me = this
      let nodes = this.getRelationNodes('../form-item/index')

      nodes.forEach((node, index) => {
        node.setData({
          index: index,
          labelPosition: me.data.labelPosition
        })

        if (me.data.labelWidth) {
          node.setData({
            labelWidth: me.data.labelWidth
          })
        }
      })
    },
    emitEvent (key) {
    },
    resetFields () {
      this.changeData(this.data.initData)

      this.input({
        type: 'sync'
      })

      this.input({
        type: 'input'
      })

      this.input({
        type: 'update'
      })
    },
    changeData (value) {
      this.setData({
        data: value
      })
    },
    input (event) {
      let model = this.data.data
      const { detail = {} } = event
      const { value = '' } = detail
      const { prop = '' } = detail
      const { modelName, valueName } = this.data

      if (
        prop && event.type === 'sync' || 
        prop && event.type === 'input' || 
        prop && event.type === 'update'
      ) {
        model[prop] = value
      }

      this.setData({
        value: model
      })

      this.setData({
        model
      })

      // 用于双向绑定
      let syncType = ''

      if (!prop && model && modelName) {
        syncType = 'model'
      }

      if (prop && model && modelName) {
        syncType = 'prop'
      }

      let options = [
        { event, value, prop, model, modelName, valueName, syncType, updateType: syncType, source: 'form' },
        { bubbles: true, composed: true }
      ]

      this.triggerEvent(
        'sync',
        ...options
      )

      this.triggerEvent(
        'input',
        ...options
      )

      this.triggerEvent(
        'update',
        ...options
      )
    },
    // 校验所有字段
    validate () {
      const me = this
      const rules = this.data.rules
      const validateType = this.data.validateType
      let validate = true
      let result = []

      Object.keys(rules).forEach(key => {
        let valid = me.validateField(key)

        if (validateType === 'boolean' && !valid) {
          validate = false
        }

        if (validateType === 'array' && valid.length) {
          result = result.concat(valid)
        }
      })

      if (this.data.validateType === 'boolean') {
        return validate
      }

      if (this.data.validateType === 'array') {
        return result
      }
    },
    // 校验单独字段
    validateField (key) {
      const model = this.data.data
      const data = model[key]
      const rules = this.data.rules[key]
      let validate = true
      let result = []

      rules.forEach(rule => {
        // 必填
        if (rule.required) {
          validate = !!data
        }

        // 自定义函数验证
        if (rule.validator) {
          validate = rule.validator(rule, data)
        }
        
        // 字符串验证
        if (rule.type === 'string') {
          if (rule.min) {
            validate = data.length < rule.min
          }

          if (rule.max) {
            validate = data.length > rule.max
          }
        }

        // 数字验证
        if (rule.type === 'number') {
          if (rule.min) {
            validate = data < rule.min
          }

          if (rule.max) {
            validate = data > rule.max
          }

          if (rule.minlength) {
            validate = (data + '').length < rule.minlength
          }

          if (rule.maxlength) {
            validate = (data + '').length > rule.maxlength
          }
        }
        
        // 数组验证
        if (rule.type === 'array') {
          if (rule.min) {
            validate = data.length < rule.min
          }

          if (rule.max) {
            validate = data.length > rule.max
          }
        }

        // 日期验证
        if (rule.type === 'date') {
          validate = /^\d{4}[\/\-]\d{2}[\/\-]\d{2}$/.test(data)
        }

        // 正则验证
        if (rule.pattern) {
          let pattern

          if (Object.prototype.toString.call(rule.pattern) === '[object Array]') {
            pattern = new RegExp(rule.pattern[0], rule.pattern[1] || null)
          } else {
            pattern = rule.pattern
          }

          validate = pattern.test(data)
        }

        // 验证失败
        if (!validate) {
          result.push({
            prop: key,
            rule: rule,
            validate: false
          })
        }
      })

      if (this.data.validateType === 'boolean') {
        return validate
      }

      if (this.data.validateType === 'array') {
        return result
      }
    }
  },
  ready () {
    const initData = Object.assign({}, this.data.data)

    this.setData({
      initData
    })
  }
})
