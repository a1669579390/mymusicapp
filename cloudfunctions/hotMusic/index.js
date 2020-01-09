// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const rp = require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var url =`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&topid=26&needNewCode=1&uin=0&tpl=3&page=detail&type=top&platform=h5&jsonpCallback=jp1`
  return rp(url)
  .then(res=>{
    return res;
  })
  .catch(err=>{console.log(err)})
}