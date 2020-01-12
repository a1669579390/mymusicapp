// pages/detail/detail.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //接收参数
    pid:0,
    imgUrl:'',
    list:[],
    musicmid:0,//用来存放当前播放音乐的id
  },
// 调用云函数getRank获取排行前300歌曲
getDetails(){
  wx.showLoading({
    title: '加载中····',
  });
  wx.cloud.callFunction({
    name:"getRank",
    data:{id:this.data.pid},
    success:(res)=>{
      // console.log(res.result)
      var res1 = res.result.replace("jp4(", "")
      var res2 = JSON.parse(res1.substring(0, res1.length - 1))
      this.setData({ list: res2 })
      wx.hideLoading();
      console.log(this.data.list)
    }
  })
},
/*跳转指定歌曲先获取vkey */
toPlay(event){
  let index=event.currentTarget.dataset.index;
  console.log(index)
  let mid = event.currentTarget.dataset.mid;
  let strMediaMid = event.currentTarget.dataset.smm;
  let alumn=event.currentTarget.dataset.alumn;
  let albumname = event.currentTarget.dataset.albumname;//专辑名字
  getApp().globalData.albumname = albumname;//把专辑名字赋给全局变量
  let name=event.currentTarget.dataset.name;//歌手名字
  getApp().globalData.album = name;
  let item = getApp().globalData.playList
  item.unshift(this.data.list.songlist[index])
  let path = `/pages/music/musicPlay?&mid=${mid}&strMediaMid=${strMediaMid}&alumn=${alumn}&albumname=${albumname}&name=${name}`;
  wx.navigateTo({
    url: path,
  });   
},
/*点击巅峰榜的播放按钮将所有音乐添加到播放列表 */
playAll(){
  getApp().globalData.playList=this.data.list.songlist
  console.log(getApp().globalData.playList)
  Toast.success('添加成功')
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收rank组件的传参
    this.setData({pid:options.id,imgUrl:options.imgurl})
    this.getDetails()
    let that = this;
    getApp().watch(that.watchBack)
    this.setData({
      musicmid:getApp().globalData.musicmid
    })
  },
  watchBack: function (musicmid) {
    console.log(musicmid)
    this.setData({
      musicmid:musicmid
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
 
    // getApp().globalData.musicmid
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