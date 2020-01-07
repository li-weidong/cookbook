// pages/list/list.js
Component({
  lifetimes: {
    attached: function() {
      wx.showShareMenu({
        withShareTicket: true
      })
      this.onLoad();
      wx.nextTick(() => {
        this.getList();
      })
      
    },
    onLoad() {
      wx.showShareMenu({
        withShareTicket: true
      })
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
    list: [],
    classid:'',
    classidName:'',
    start:1,
    loading:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function(options) {
      this.setData({
        classid: options.classid,
        classidName: options.classidName,
        
      })
    },
    getList(event) {
      let totol
      wx.request({
        url: 'https://jisusrecipe.market.alicloudapi.com/recipe/byclass',
        data: {
          classid: this.data.classid,
          start: this.data.start,
          num: 10,
        },
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'APPCODE 1714adafe243462f882805f9bc74805d'
        },
        success: (res) => {
          let result = res.data.result;
          console.log(result)
          if (res.data.status === 0) {
            let total = result.total;
           console.log(total)
            this.setData({
              start:this.data.start + 1,
            })
            let start = this.data.start*10
            if (start > total){
              console.log("b")
              this.setData({
                loading:false
              })
              return false;
            }
            if (total < "10") {
              this.setData({
                loading: false
              })
              console.log("a")
            }
            this.setData({
              list: [...this.data.list, ...result.list]
            })
          }
        }
      })
    },
    // 点击后跳转到详情页路由
    detail(e) {
      wx.navigateTo({
        url: `../detail/detail?id=${e.currentTarget.id}`,
      })
    },
    searchScrollLower(){
      console.log("a");
      this.getList();
    },
  },
  
})