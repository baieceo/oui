// oui/packages/tab-pane/index.js
Component({
  options: {
    styleIsolation: 'isolated'
  },
  relations: {
    '../tabs/index': {
      type: 'parent', // 关联的目标节点应为父节点
      linked (target) {
        // 每次被插入到tabs时执行，target是tabs节点实例对象，触发在attached生命周期之后
      },
      linkChanged (target) {
        // 每次被移动后执行，target是tabs节点实例对象，触发在moved生命周期之后
      },
      unlinked (target) {
        // 每次被移除时执行，target是tabs节点实例对象，触发在detached生命周期之后
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    key: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCurrent (current) {
      this.setData({ current });
    }
  }
})
