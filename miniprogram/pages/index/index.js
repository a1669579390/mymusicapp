// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      //{pic:'',name:'下山',detail:'要不要买菜·下山'},
    //   { pic: '', name: '下山', detail: '要不要买菜·下山' },
    //   { pic: '', name: '下山', detail: '要不要买菜·下山' },
    //   { pic: '', name: '下山', detail: '要不要买菜·下山' },
    //   { pic: '', name: '下山', detail: '要不要买菜·下山' },
    //   { pic: '', name: '下山', detail: '要不要买菜·下山' }
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getRecommenData:function(){
    wx.showLoading({
      title: '加载中····',
    });
    wx.cloud.callFunction({
      name:"hotMusic",
    }).then(res=>{    
      var res1 = res.result.replace("jp1(","")
      var res2=JSON.parse(res1.substring(0,res1.length-1))
      var res3 = res2.songlist.slice(0, 6)
      this.setData({list:res3})
      wx.hideLoading();
      console.log(this.data.list)     
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getRecommenData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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