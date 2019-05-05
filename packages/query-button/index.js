// oui/packages/query-button/index.js
Component({
  properties: {
    city:{
      type: String,
      value: '保定'
    } 
  },
  data: {
      imgSrc: '../../../assets/images/from/bottom.png',
      mode:'scaleToFill'
  },
  // 方法
  methods: {
    clickCity(e) {
      let cityName = e.currentTarget.dataset.city
      this.triggerEvent('selectCity', cityName)
    }
  }
});