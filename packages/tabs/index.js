// oui/packages/tabs/tabs/index.js
Component({
  options: {
    styleIsolation: 'isolated'
  },
  relations: {
    '../tab/index': {
      type: 'child', // 关联的目标节点应为子节点
      linked (target) {
        // 每次有tab被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
        this.changeCurrent()
      },
      linkChanged (target) {
        // 每次有tab被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
        this.changeCurrent()
      },
      unlinked (target) {
        // 每次有tab被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
        this.changeCurrent()
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    current: {
      type: String,
      value: '',
      observer: 'changeCurrent'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabs: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCurrent (val = this.data.current) {
      let tabs = []
      let items = this.getRelationNodes('../tab/index')
      const len = items.length

      if (len > 0) {
        items.forEach(item => {
          item.changeCurrent(item.data.key === val)
          tabs.push(item.data)
        })
      }

      this.setData({
        tabs: tabs
      })
    },
    emitEvent (key) {
      this.triggerEvent('change', { key })
    },
    handleClickItem (e) {
      const current = e.target.dataset.key

      this.setData({
        current
      })
    }
  }
})
