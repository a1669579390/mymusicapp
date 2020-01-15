// pages/gedan/gedanDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  /*调用云函数获取歌单详情 */
  getGedanDetail(id) {
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
      // console.log(str5_01)
    })
  },
  /*跳转播放界面 */
  to_music(event){
    let index = event.currentTarget.dataset.index;
    let mid=event.currentTarget.dataset.mid;
    let alumn = event.currentTarget.dataset.alumn;
    let name = event.currentTarget.dataset.name;
    let albumname=event.currentTarget.dataset.albumname;
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
    console.log(options)
    this.getGedanDetail(options.id)
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