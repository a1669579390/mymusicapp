Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#1296db",
    canCustom: true,
    on:false,
    alumnUrl:'',
    animationData: {},
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "乐库",
        "iconPath": "../images/music.png",
        "selectedIconPath": "../images/selectmusic.png"
      },
      {
        "pagePath": "/pages/index/index",
        "text": "",
        "iconPath": "../images/playnow.png",
        "selectedIconPath": "../images/playnow.png"
      },
      {
        "pagePath": "/pages/rank/rank",
        "text": "排行",
        "iconPath": "../images/phbnoselect.png",
        "selectedIconPath": "../images/phbselect.png"
      }
    ]
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行    
      let alumnUrl=getApp().globalData._alumnUrl;
      let on=getApp().globalData._on;
      this.setData({
        alumnUrl,
        on
      })
    },
  },
  methods: {   
      switchTab(e) {
        let musicUrl=getApp().globalData._musicUrl;
        console.log(musicUrl)
        const data = e.currentTarget.dataset
        const url = data.path
        if(data.index==1){
          if(musicUrl==''){
            console.log(11)
          }else{
            wx.navigateTo({
              url: musicUrl,
            })
          }         
        }
        this.setData({
          selected: data.index
        })
        wx.switchTab({ url })       
      }
    }
})
