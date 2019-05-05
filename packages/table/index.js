// oui/packages/table/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    columns: {
      type: Array,
      value: [],
      observer: 'watchColumns'
    },
    data: {
      type: Array,
      value: []
    },
    border: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    columnsData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    watchColumns (newVal) {
      let columns = newVal
      let widths = []
      let count = 0

      columns.forEach(column => {
        if (column.width) {
          widths.push(column.width)
          count++
        }
      })

      columns.forEach(column => {
        if (!column.width) {
          column.width = `calc(${widths.length ? '(100% - ' + widths.join(' - ') + ')' : '100%'} / ${columns.length-count})`
        }

        if (!column.align) {
          column.align = 'left'
        }
      })

      this.setData({
        columnsData: columns
      })
    }
  }
})
