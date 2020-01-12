// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    picUrl:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommenData()
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
      let arr=[]  
      res3.map((item,index)=>{
        let url = `https://y.gtimg.cn/music/photo_new/T002R500x500M000${item.data.albummid}_100.jpg`
        arr.push(url)
        this.setData({
          picUrl:arr
        })
      })
      wx.hideLoading();
      console.log(this.data.list)     
      console.log(this.data.picUrl)
    }).catch(err=>{
      console.log(err)
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