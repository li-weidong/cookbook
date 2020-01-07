// pages/detail/detail.js
Component({
  //  生命周期函数--监听页面加载
  lifetimes: {
     created() {
       wx.showShareMenu({
         withShareTicket: true
       })
       this.onLoad();
       
        
      
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    id: '',
    getData:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function(options) {
      this.setData({
        id: options.id
      })
      wx.nextTick(() => {
        this.querList();// 在当前同步流程结束后，下一个时间片执行
      })

    },
    querList() {
      wx.request({
        url: 'https://jisusrecipe.market.alicloudapi.com/recipe/detail',
        data: {
          id: this.data.id
        },
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'APPCODE 1714adafe243462f882805f9bc74805d'
        },
        success: (res) => {
          console.log(res.data.result)
          if (res.data.status === 0) {
            this.setData({
              getData: res.data.result,
            })
          }
        }
      })
    }
  }
})