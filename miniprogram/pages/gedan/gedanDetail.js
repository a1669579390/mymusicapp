// pages/gedan/gedanDetail.js
let common = require('../../components/api/get.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    musicmid: 0,//用来存放当前播放音乐的id
  },
  /*调用云函数获取歌单详情 */
  getGedanDetail(id) {
    wx.showLoading({
      title: '加载中····',
    });
    wx.cloud.callFunction({
      name: 'getGeDetail',
      data: {
        id
      }
    }).then(res => {
      let rn = res.result;
      let str = rn.indexOf("window.taogeInfo")//实现截取官方歌单的JSON对象
      let str1 = rn.substring(str)
      let str2 = str1.indexOf("</script>")
      let str3 = str1.substring(0, str2)
      let str4 = str3.indexOf("window.songList")
      let str5 = str3.substring(0, str4)//截取歌单的专辑图
      let str5_01 = str3.substring(str4)//截取歌曲列表
      str5_01 = str5_01.replace("window.songList =", "")
      str5_01 = JSON.parse(str5_01)
      str5 = str5.replace("window.taogeInfo =", "")
      str5 = str5.replace(";", "")
      str5 = JSON.parse(str5)
      let arr1=[];
      
      for(let i=0;i<str5_01.length;i++){
        let obj = {};
        obj.data=str5_01[i]
        arr1.push(obj)
      }    
      console.log(arr1)
      this.setData({
        imgUrl:str5.logo,
        title: str5.dissname,
        list: arr1
      })
      wx.hideLoading();
      // console.log(str5_01)
    })
  },
  /*跳转播放界面 */
  to_music(event){
    let list = this.data.list;
    common.to_music(event, list)
  },
  watchBack: function (musicmid) {
    this.setData({
      musicmid: musicmid
    })
  },
  /*点击歌单的播放按钮将所有音乐添加到播放列表 */
  playAll(event) {
    getApp().globalData.playList = this.data.list
    let list=this.data.list
    common.to_music(event, list)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getGedanDetail(options.id)
    let that = this;
    getApp().watch(that.watchBack)
    this.setData({
      musicmid: getApp().globalData.musicmid
    })
    // console.log(this.data.musicmid)
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