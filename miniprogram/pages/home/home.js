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
        url: 'https://caipu.market.alicloudapi.com/showapi_cpType', //菜谱分类接口
        data: {
        },
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'APPCODE 1714adafe243462f882805f9bc74805d'
        },
        success(res) {
          let list = res.data.showapi_res_body
          console.log(list)
          let menu = []
          for (const key in list) {
            console.log()
            if (list.hasOwnProperty(key)&&typeof(list[key]) === 'object') {
              console.log(list[key],key)
              menu.push({name:key,pic:`../../images/${key}.png`})
            }
          }
          self.setData({
            list: menu,
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