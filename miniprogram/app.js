//app.js
App({
  globalData:{
    index:0,
    rankList:'',
    auto:true,//控制暂停播放
    album:'',//当前歌手名字
    albumname:'',//当前专辑名字
    playList:[],//当前播放列表
    _musicmid:'',//当前播放音乐的mid
    palyIndex:0,//当前播放歌曲的index
    mode:'single',
    _musicUrl:'',//存放当前正在播放的音乐路径
    _on:false,//控制专辑图的旋转
    alumnUrl:'',//存放当前正在播放的专辑图
  },
  getRank() {
    var that = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    wx.showLoading({
      title: '加载中····',
    });
  wx.cloud.callFunction({
      name: "hotRank"
    }).then(res => {
      var res1 = res.result.replace("jp1(", "")
      var res2 = JSON.parse(res1.substring(0, res1.length - 1))
      var arr = [];
      that.globalData.rankList = res2.data.topList
      // 修改原有数据让标题拼接字符
      for (let key of res2.data.topList) {
        arr.push(key.topTitle.replace('巅峰榜·', ""))
      }
      for (let key in arr) {
        if (arr[key].indexOf('榜') == -1) {
          arr[key] += '榜'
        }
      }
      that.globalData.hotRank = arr
      // 遍历播放次数，添加万
      let arr1 = [];
      for (let i of that.globalData.rankList) {
        arr1.push((i.listenCount /= 10000).toFixed(1) + "万")
      }
      that.globalData.listenCount = arr1
      wx.hideLoading();
    }).catch(err => {
      console.log(err)
    })    
  },
  /*监听全局属性golbal的值发生变化 */
  watch:function(method){
    var obj=this.globalData;
    Object.defineProperty(obj,"musicmid",{
      configurable:true,
      enumerable:true,
      set:function(value){
        console.log(value)
        this._musicmid=value;
        
        method(value)
      },
      get:function(){
        return this._musicmid
      }
    })
  },
  /*全局属性值监听 */
 setWatcher(data,watch){//接收musicPlay.js传来的data对象和watch对象
  Object.keys(watch).forEach(v=>{//将watch对象内的key遍历
  this.observe(data,v,watch[v])
  })
 },
 observe(obj,key,watchFun){
   var val=obj[key];//给该属性设置默认值
   Object.defineProperty(obj,key,{
     configurable:true,
     enumerable:true,
     set:function(value){
       val=value;
       watchFun(value,val)//赋值set时，调用对应函数
     },
     get:function(){
       return val
     }
   })
 },
  onLaunch: function () {  
    this.getRank()
  }
})
