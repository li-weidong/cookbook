// pages/classification/classification.js
Component({
  //  生命周期函数--监听页面加载
  lifetimes: {
    attached() {
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
    list:[],
    listName:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      let item = JSON.parse(options.list);
      let listName = options.listName;
      this.setData({
        list: item,
        listName: listName
      })
      wx.nextTick(() => {
        console.log(this.data.list)
      })

    },
  }
})
