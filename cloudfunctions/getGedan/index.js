// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const rq= require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var url ='https://u.y.qq.com/cgi-bin/musicu.fcg?cgiKey=GetHomePage&_=1578915092401&data={%22comm%22:{%22g_tk%22:5381,%22uin%22:%22%22,%22format%22:%22json%22,%22inCharset%22:%22utf-8%22,%22outCharset%22:%22utf-8%22,%22notice%22:0,%22platform%22:%22h5%22,%22needNewCode%22:1},%22MusicHallHomePage%22:{%22module%22:%22music.musicHall.MusicHallPlatform%22,%22method%22:%22MobileWebHome%22,%22param%22:{%22ShelfId%22:[101,102,161]}},%22hotkey%22:{%22module%22:%22tencent_musicsoso_hotkey.HotkeyService%22,%22method%22:%22GetHotkeyForQQMusicMobile%22,%22param%22:{%22remoteplace%22:%22txt.miniapp.wxada7aab80ba27074%22,%22searchid%22:%221559616839293%22}}}'
  return rq(url)
  .then(res=>{
    return res
  })
  .catch(err=>{
    console.log(err)
  })
}