// pages/home/home.js
Component({
  lifetimes: {
    attached: function() {
      wx.showShareMenu({
        withShareTicket: true
      })
      // 在组件实例进入页面节点树时执行
      let self = this
      wx.request({
        url: 'https://jisusrecipe.market.alicloudapi.com/recipe/class', //菜谱分类接口
        data: {
        },
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'APPCODE 1714adafe243462f882805f9bc74805d'
        },
        success(res) {
          console.log(res.data)
          res.data.result[0].pic = "../../images/gongneng.png"
          res.data.result[1].pic = "../../images/renqun.png"
          res.data.result[2].pic = "../../images/jibingshaicha.png"
          res.data.result[3].pic = "../../images/laonianrentizhibianshi.png"
          res.data.result[4].pic = "../../images/caixiicon.png"
          res.data.result[5].pic = "../../images/xiaochikuaican.png"
          res.data.result[6].pic = "../../images/caipinpaixu.png"
          res.data.result[7].pic = "../../images/kouwei.png"
          res.data.result[8].pic = "../../images/jiagong.png"
          res.data.result[9].pic = "../../images/chufangyongju.png"
          res.data.result[10].pic = "../../images/changjing.png"
          res.data.result = [{
            name: "搜索",
            pic: "../../images/sousuo.png"
          }, ...res.data.result]
          self.setData({
            list: res.data.result,
          })

        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click: function(e) {
      console.log(e.target.id)
      if (e.target.id === "") {
        wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
          url: "/pages/search/search"
        })
      } else {
        let list = this.data.list;
        let classid = e.target.id;
        let newList = list.find(item => item.classid == classid).list;
        let listName = list.find(item => item.classid == classid).name;
        let obj = JSON.stringify(newList)
        wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
          url: "/pages/classification/classification?list=" + obj + "&listName=" + listName
        })
      }
    }
  },
})