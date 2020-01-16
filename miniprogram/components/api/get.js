/*跳转播放界面 */
function to_music(event,list){
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
  console.log(list[index])
  item.unshift(list[index])
  console.log(item)
  let path = `/pages/music/musicPlay?&mid=${mid}&strMediaMid=${strMediaMid}&alumn=${alumn}&albumname=${albumname}&name=${name}`;
  wx.navigateTo({
    url: path,
  });
}
module.exports.to_music=to_music