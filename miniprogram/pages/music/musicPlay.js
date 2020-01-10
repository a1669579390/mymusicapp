// pages/music/musicPlay.js
// 首先需要在父页面 onLoad() 方法中添加监听以及指定监听回调方法
//设置App监听回调
// 如果其他页面修改了 app.js 中的 showPictureDetail 值, 就会触发回调

//获取全局唯一的背景音乐管理器
const bgMusic = wx.getBackgroundAudioManager()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,//控制弹出层
    on:true,//控制图片旋转
    auto:true,//控制暂停播放
    musicmid:0,//当前播放音乐的mid值
    strMediaMid:'',
    drt:'-:--',//初始化实践
    totalTime:'-:--',
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight']*2,//动态获取状态栏高度
    playList:[]//当前音乐的播放列表
  },
  /*设置音乐播放按钮函数 */
  currentMusic(){
    let timer; 
    let tol; 
   // 监听音频播放进度
      bgMusic.onTimeUpdate(() => {
        //当前音频的播放位置  
        timer = parseInt(bgMusic.currentTime % 60)
        if (timer < 10) {
          timer = '0' + timer
        }
        //总的播放时长
        tol = parseInt(bgMusic.duration % 60)
        if(tol<10){
          tol='0'+tol
        }        
        this.setData({
          /*总的播放时长 */
          totalTime: parseInt(bgMusic.duration / 60) + ':' +tol,
          /*当前播放到几分钟 */
          drt: parseInt(bgMusic.currentTime / 60) + ':' + timer
        })
      })
  },
  /*控制音乐是否自动播放 */
  playMusic(){
    if(this.data.auto){
      this.setData({ on: false, auto: false  })
      bgMusic.pause()
    }else{
      this.setData({ on: true , auto: true })
      bgMusic.play()
    }
  },
  /*获取vkey值 */
  getVkey(mid) {
    wx.cloud.callFunction({
      name: "getvary",
      data: {
        mid
      },
    }).then(res => {
      var res2=JSON.parse(res.result)
      console.log(res2)
      let url = `http://isure.stream.qqmusic.qq.com/${res2.req_0.data.midurlinfo[0].purl}`  
      if (getApp().globalData.musicmid==this.data.musicmid){
        this.currentMusic()
      }else{
        // 在跳转的时候将值给全局变量musicmid来控制重新播放
        getApp().globalData.musicmid = mid;
        getApp().globalData.musicSrc = url
        this.setData({ musicUrl: url })
        bgMusic.title = getApp().globalData.albumname,
          //判断进入播放器时当前播放的音乐跟点的是否一致，如果一直就不播放
          bgMusic.src = this.data.musicUrl;
        this.setData({ auto: 1 })
        this.currentMusic()
      }
    
    })
      .catch(err => { console.log(err) })
  },
  /*返回上一页 */
  back(){
    wx.navigateBack({ changed: true })
  },
  /*显示弹出层 */
  showPopup() {
    this.setData({ show: true });
  },
/*关闭弹出层 */
  onClose() {
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let mid=options.mid;
    this.setData({
      strMediaMid:options.strMediaMid,
      alumnUrl: `https://y.gtimg.cn/music/photo_new/T002R500x500M000${options.alumn}_100.jpg`,//歌曲专辑图片
      albumname: getApp().globalData.albumname,//歌曲名字
      name: getApp().globalData.album,//歌手名字
      musicmid:mid,//歌曲唯一id
      playList:getApp().globalData.playList
    })
    this.getVkey(mid)
  },
  //定义监听回调方法
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.playList)
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