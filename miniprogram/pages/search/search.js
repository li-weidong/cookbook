// pages/search/search.js
Component({
  lifetimes: {
    attached: function() {
      wx.showShareMenu({
        withShareTicket: true
      })
      this.onSearch()
    }
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
    name: '',
    start: 1,
    lowline: false,
    loading: false,
    none:false,
    tip:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch(event) {

      this.setData({
        name: event.detail,
        loading: true
      })

      wx.request({
        url: 'https://jisusrecipe.market.alicloudapi.com/recipe/search',
        data: {
          keyword: this.data.name,
          start: this.data.start,
          num: 10
        },
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'APPCODE 1714adafe243462f882805f9bc74805d'
        },
        success: (res) => {
          console.log(res)
          this.setData({
            loading: false,
            tip:false
          })
          if (res.data.status === 0) {
            let total = res.data.result.total;
            this.setData({
              start: this.data.start + 1,
            })
            let start = this.data.start * 10-1;
            this.setData({
              list: [...res.data.result.list],
            })
          }else{
            this.setData({
              none: true,
              list: []
            })
          }
        }
      })
    },
    detail(e) {
      wx.navigateTo({
        url: `../detail/detail?id=${e.currentTarget.id}`,
      })
    },
    addlist() {
      this.setData({
        loading: false
      })
      wx.request({
        url: 'https://jisusrecipe.market.alicloudapi.com/recipe/search',
        data: {
          keyword: this.data.name,
          start: this.data.start,
          num: 10
        },
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'APPCODE 1714adafe243462f882805f9bc74805d'
        },
        success: (res) => {
          console.log(res)
          this.setData({
            loading: true,
          })
          if (res.data.status === 0) {
            let list = res.data.result.list;
            let total = res.data.result.total;
            this.setData({
              start: this.data.start + 1,
            })
            let start = this.data.start * 10
            if (start > total) {
              console.log("b")
              this.setData({
                loading: false
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
              list: [...this.data.list, ...list]
            })
            console.log(list)
          }
        }
      })
    },
    searchScrollLower() {
      console.log("a");
      this.addlist();
    },
  }
})