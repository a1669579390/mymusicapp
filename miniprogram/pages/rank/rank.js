// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList: getApp().globalData.rankList ,
    hotRank:[],
    listenCount:[]
  },
  toRank:function(event){
    let id = event.currentTarget.dataset.id;
    let imgurl = event.currentTarget.dataset.imgurl;
    let path =`/pages/detail/detail?id=${id}&imgurl=${imgurl}`
    //(6)保存并且跳转详情组件
    wx.navigateTo({
      url: path,
    }); 
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({ 
      rankList: getApp().globalData.rankList,
      hotRank:getApp().globalData.hotRank,
      listenCount:getApp().globalData.listenCount
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let on = getApp().globalData._on
    let alumnUrl = getApp().globalData.alumnUrl
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
        on,
        alumnUrl
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})