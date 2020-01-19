// pages/music/musicPlay.js
// 首先需要在父页面 onLoad() 方法中添加监听以及指定监听回调方法
//设置App监听回调
// 如果其他页面修改了 app.js 中的 showPictureDetail 值, 就会触发回调
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
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
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight']*2,//动态获取状态栏高度
    playList:[],//当前音乐的播放列表
    playSongs:[],//当前播放列表的所有songmid
    mode:'single'
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
      getApp().globalData._on=false;
      getApp().globalData.auto=false;
      bgMusic.pause()
    }else{
      this.setData({ on: true , auto: true })
      getApp().globalData._on = true;
      getApp().globalData.auto = true;
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
        // this.currentMusic()
      }else{
        // 在跳转的时候将值给全局变量musicmid来控制重新播放
        getApp().globalData.musicmid = mid;
        getApp().globalData.musicSrc = url;
        getApp().globalData._on = true;
        this.setData({ musicUrl: url, auto: 1 })
        bgMusic.title = this.data.albumname,
          //判断进入播放器时当前播放的音乐跟点的是否一致，如果一直就不播放
          bgMusic.src = this.data.musicUrl;
      }    
    })
      .catch(err => { console.log(err) })
  },
  /*关闭弹出层 */
  onClose() {
    this.setData({ show: false });
  },
  /*获取当前歌曲的信息 */
  getSongMsg(mid, strMediaMid, alumn) {
    let playList = getApp().globalData.playList;
    var p1=[...new Set(playList)]
    console.log(p1)
    /*对数组去重 */
    this.setData({
      strMediaMid: strMediaMid,
      alumn: alumn,
      alumnUrl: `https://y.gtimg.cn/music/photo_new/T002R500x500M000${alumn}_100.jpg`,//歌曲专辑图片
      albumname: getApp().globalData.albumname,//歌曲名字
      name: getApp().globalData.album,//歌手名字
      musicmid: mid,//歌曲唯一id
      playList: p1
    })
    getApp().globalData.alumnUrl = this.data.alumnUrl
  },
   //定义一个函数获取到播放列表所有的songmid
  getMid() {
    this.data.playList.map((item, index) => {
      this.data.playSongs.push(item.data.songmid)
    })
  },
  // 点击上一曲触发事件
  onPrev(){
    let i;
    for (var key in this.data.playSongs) {
      if (this.data.playSongs[key] == this.data.musicmid) {
        i = parseInt(key)
      }
    }
    if (i ==0) {
      // console.log("这是第一首")
    } else {
      this.getVkey(this.data.playSongs[i - 1])
      let albumname = this.data.playList[i - 1].data.songname;
      let singer = this.data.playList[i - 1].data.singer[0].name;
      let alumnUrl = `https://y.gtimg.cn/music/photo_new/T002R500x500M000${this.data.playList[i - 1].data.albummid}_100.jpg`;
      // this.getSongMsg(this.data.musicmid,this.data.strMediaMid,this.data.alumn)
      // console.log(albumname, singer, alumnUrl)
      this.setData({
        musicmid: this.data.playSongs[i - 1],
        albumname,
        name: singer,
        alumnUrl: alumnUrl,
      })
      let musicUrl = `/pages/music/musicPlay?&mid=${this.data.musicmid}&strMediaMid=${this.data.strMediaMid}&alumn=${this.data.playList[i-1].data.albummid}&albumname=${this.data.albumname}&name=${this.data.name}`
      getApp().globalData._musicUrl=musicUrl;
      getApp().globalData.alumnUrl = alumnUrl;
      bgMusic.title = this.data.albumname
    }
  },
  /*点击下一曲触发事件 */
  onNext() {
    let i=0;
    for (var key in this.data.playSongs) {
      if (this.data.playSongs[key] == this.data.musicmid) {
        i = parseInt(key)
      }
    }
    if(i==this.data.playList.length-1){
      // console.log("这是最后一首")
    }else{
      this.getVkey(this.data.playSongs[i + 1])
      let albumname = this.data.playList[i + 1].data.songname;
      let singer = this.data.playList[i + 1].data.singer[0].name;
      let alumnUrl = `https://y.gtimg.cn/music/photo_new/T002R500x500M000${this.data.playList[i + 1].data.albummid}_100.jpg`;
      // console.log(albumname, singer, alumnUrl)
      this.setData({
        musicmid: this.data.playSongs[i + 1],
        albumname,
        name: singer,
        alumnUrl: alumnUrl
      })
      let musicUrl = `/pages/music/musicPlay?mid=${this.data.musicmid}&strMediaMid=${this.data.strMediaMid}&alumn=${this.data.playList[i + 1].data.albummid}&albumname=${this.data.albumname}&name=${this.data.name}`
      getApp().globalData._musicUrl = musicUrl
      console.log(alumnUrl)
      bgMusic.title = this.data.albumname
      getApp().globalData.alumnUrl=alumnUrl
    }
  },
  /*切换播放模式 */
  checked(){
    if(this.data.mode=='single'){
      getApp().globalData.mode='loop'
      this.setData({
        mode:'loop'
      })
      Toast({message:'列表循环',position:"bottom"})
    }else{
      getApp().globalData.mode == 'single'
      this.setData({
        mode:'single'
      })
      Toast({ message: '单曲循环', position: "bottom" })
    }
  },
  /*背景音乐自然结束触发的时间 */
  musicEnd(){
    bgMusic.onEnded(()=>{
      console.log(this.data.mode)
      if (this.data.mode=='single'){
        console.log("单曲循环")
        bgMusic.title = getApp().globalData.albumname,
          //判断进入播放器时当前播放的音乐跟点的是否一致，如果一直就不播放
        bgMusic.src = getApp().globalData.musicSrc;
      }else{
        this.onNext()
        console.log("下一曲")
      } 
    })
  },
    musicErr(){
      bgMusic.onError(() => {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '网络错误,即将切换到下一曲'
        });
        getApp().globalData._on=false
        this.setData({on:false})
        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second == 0) {
            clearInterval(timer);
            // 手动清除 Toast
            console.log("即将播放下一曲")
            Toast.clear();
            this.onNext()
          }
        }, 1000);
      })
    },


  /*在播放列表点击播放 */
  playMusic_1(event) {
    let mid = event.currentTarget.dataset.mid;
    let albummid = event.currentTarget.dataset.albummid;
    let songname = event.currentTarget.dataset.songname;
    let singer = event.currentTarget.dataset.singer;
    this.setData({
      musicmid: mid,
      alumnUrl: `https://y.gtimg.cn/music/photo_new/T002R500x500M000${albummid}_100.jpg`,
      name: singer,
      albumname: songname
    })
    this.getVkey(mid)
  },
  /*清空播放列表 */
  clearList(){
    this.setData({ show: false });
    Dialog.confirm({
      title: '提示',
      message: '确定要清空列表？',
      confirmButtonText:"清空",
      cancelButtonText:"取消",
      width:"700rpx"
    }).then(() => {
      bgMusic.stop()
      getApp().globalData.playList.length=0;
      getApp().globalData.musicmid=null
      getApp().globalData._on=false;
      getApp().globalData.alumnUrl='';
      this.setData({
        playList:[],
      })
      wx.navigateBack({
        delta: 1
      })
    }).catch(() => {
      // on cancel
    });
   
  },
  /*返回上一页 */
  back(){
    wx.navigateBack({ changed: true })
  },
  /*显示弹出层 */
  showPopup() {
    this.setData({ show: true });
  },
 /*删除播放列表指定的一曲*/
 del(event){
   let index = event.currentTarget.dataset.index;
   let mid=event.currentTarget.dataset.mid;
   if(this.data.musicmid==mid){
     Toast({
       message:"当前音乐正在播放",
       position:"bottom"
     })
   }else{
     this.data.playList.splice(index, 1)
     this.data.playSongs.splice(index, 1)
     this.setData({
       playList: this.data.playList,
       playSongs: this.data.playSongs
     })
     getApp().globalData.playList = this.data.playList;
   }
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    getApp().globalData.albumname=options.albumname;
    getApp().globalData.album=options.name;
    let mid=options.mid;
    let strMediaMid = options.strMediaMid;
    let alumn = options.alumn;
    this.musicEnd()
    this.musicErr()
    this.getSongMsg(mid, strMediaMid, alumn)
    this.getVkey(mid)
    this.getMid()
    console.log(getApp().globalData.playList)
    console.log(getApp().globalData.auto)
    this.setData({
      mode:getApp().globalData.mode,
      on:getApp().globalData.auto,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      auto: getApp().globalData.auto,
    })
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