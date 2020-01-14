// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const rq = require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  url =`https://y.qq.com/n/m/detail/taoge/index.html?ADTAG=myqq&from=myqq&channel=10007100&id=${event.id}`
 return rq(url).then(res=>{
    return res
  }).catch(err=>{
    console.log(err)
  })
}