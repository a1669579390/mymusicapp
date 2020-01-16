// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    picUrl:[],
    guanGedan:[],//官方歌单
    darenGedan:[],//达人歌单
    listenCount_0:[],//官方歌单收听
    listenCount_1:[],//达人歌单收听
  },
  getRecommenData: function () {
    wx.showLoading({
      title: '加载中····',
    });
    wx.cloud.callFunction({
      name: "hotMusic",
    }).then(res => {
      var res1 = res.result.replace("jp1(", "")
      var res2 = JSON.parse(res1.substring(0, res1.length - 1))
      var res3 = res2.songlist.slice(0, 6)
      this.setData({ list: res3 })
      let arr = []
      res3.map((item, index) => {
        let url = `https://y.gtimg.cn/music/photo_new/T002R500x500M000${item.data.albummid}_100.jpg`
        arr.push(url)
        this.setData({
          picUrl: arr
        })
      })
      wx.hideLoading();
      console.log(this.data.list)
      console.log(this.data.picUrl)
    }).catch(err => {
      console.log(err)
    })
  },
  getGedan(){
    wx.showLoading({
      title: '加载中····',
    });
    wx.cloud.callFunction({
      name:"getGedan",
    }).then(res=>{  
      let result=JSON.parse(res.result)
      let guanGedan = result.MusicHallHomePage.data.v_shelf[0];
      let darenGedan = result.MusicHallHomePage.data.v_shelf[1];
      console.log(guanGedan.v_niche[0].v_card)
      let arr=[];
      let arr1=[];   
      guanGedan.v_niche[0].v_card.map((item,index)=>{
        arr.push((item.cnt /= 10000).toFixed(1) + "万")
        })
      darenGedan.v_niche[0].v_card.map((item, index) => {
        arr1.push((item.cnt /= 10000).toFixed(1) + "万")
      })
        console.log(arr1)
      this.setData({ 
        guanGedan,
        darenGedan,
        listenCount_0:arr,
        listenCount_1:arr1
        })
      // console.log(this.data.guanGedan,this.data.darenGedan)
    }).catch(err=>{
      console.log(err)
    })
  },
  /*跳转到歌单详情 */
  to_detail(event){
    let id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url: `/pages/gedan/gedanDetail?id=${id}`,
    })
  },
  /*跳转播放界面 */
  to_music(event) {
    let index = event.currentTarget.dataset.index;
    let mid = event.currentTarget.dataset.mid;
    let alumn = event.currentTarget.dataset.alumn;
    let name = event.currentTarget.dataset.name;
    let albumname = event.currentTarget.dataset.albumname;
    let strMediaMid = event.currentTarget.dataset.smm;
    getApp().globalData.albumname = albumname;//把专辑名字赋给全局变量
    getApp().globalData.album = name;
    // console.log(mid)
    let item = getApp().globalData.playList;
    item.unshift(this.data.list[index])
    let path = `/pages/music/musicPlay?&mid=${mid}&strMediaMid=${strMediaMid}&alumn=${alumn}&albumname=${albumname}&name=${name}`;
    wx.navigateTo({
      url: path,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommenData()
    this.getGedan()
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