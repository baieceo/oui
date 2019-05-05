// oui/packages/color-picker/index.js
const default_colors = [
  {
    title: '黑色',
    style: {
      color: '#FFFFFF',
      background: '#232931',
      borderColor: '#232931'
    },
    value: 0
  },
  {
    title: '白色',
    style: {
      color: '#232931',
      background: '#FFFFFF',
      borderColor: '#E7E7E7'
    },
    value: 1
  },
  {
    title: '红色',
    style: {
      color: '#FFFFFF',
      background: '#AC3D3F',
      borderColor: '#AC3D3F'
    },
    value: 2
  },
  {
    title: '黄色',
    style: {
      color: '#232931',
      background: '#E3D177',
      borderColor: '#E3D177'
    },
    value: 3
  },
  {
    title: '蓝色',
    style: {
      color: '#FFF',
      background: '#4576B1',
      borderColor: '#4576B1'
    },
    value: 4
  },
  {
    title: '橙色',
    style: {
      color: '#232931',
      background: '#ED8722',
      borderColor: '#ED8722'
    },
    value: 5
  },
  {
    title: '棕色',
    style: {
      color: '#FFFFFF',
      background: '#71584D',
      borderColor: '#71584D'
    },
    value: 6
  },
  {
    title: '灰色',
    style: {
      color: '#232931',
      background: '#E1E3E5',
      borderColor: '#E1E3E5'
    },
    value: 7
  },
  {
    title: '银色',
    style: {
      color: '#232931',
      background: 'linear-gradient(-130deg, #D9DDE2 3%, #F5FAFF 19%, #E2E4E9 25%, #B9BBC0 100%)',
      borderColor: '#F5F5F5'
    },
    value: 8
  }
]


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: '',
      observer: 'changeValue'
    },
    // 标题
    title: {
      type: String,
      value: '选择颜色'
    },
    // 颜色预设
    colors: {
      type: Object,
      value: default_colors
    },
    // 是否可见
    visible: {
      type: Boolean,
      value: false
    },
    // 占位符
    placeholder: {
      type: String,
      value: '请选择'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    colorName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeValue (value) {
      this.computedColorName()
    },
    // 计算颜色名称
    computedColorName () {
      const colors = this.data.colors
      const value = this.data.value
      const target = colors.find(color => color.value + '' === value + '')
      const name = target ? target.title : ''

      this.setData({
        colorName: name
      })
    },
    // 打开弹层
    handleColorPopupOpen () {
      this.changePopupStatus(true)
    },
    // 关闭弹层
    handleColorPopupClose () {
      this.changePopupStatus(false)
    },
    // 改变弹层状态
    changePopupStatus (visible) {
      this.setData({
        visible
      })

      this.emitter(['visible-change'], {
        value: visible
      })
    },
    // 点击颜色
    handleItemClick (e) {
      const { value, title } = e.target.dataset

      this.changePopupStatus(false)

      this.setData({
        value
      })

      // 用于双向绑定
      this.emitter(['sync', 'input', 'change', 'update'], {
        value,
        title
      })
    },
    handleVisibleChange (event) {
      this.changePopupStatus(event.detail.value)
    },
    emitter(
      events = [], 
      detail = {},  
      options = {}
    ) {
      events.forEach(type => {
        this.triggerEvent(
          type,
          detail,
          options
        )
      })
    }
  }
})
