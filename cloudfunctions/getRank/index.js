// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const rq=require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let url =`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&topid=${event.id}&needNewCode=1&uin=0&tpl=3&page=detail&type=top&platform=h5&jsonpCallback=jp4`;
  return rq(url).then(res=>{
    return res;
  }).catch(err=>{console.log(err)})
}