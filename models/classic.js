import HTTP from '../util/http.js';
export default class ClassicModel extends HTTP {
   getLatest(callback){
    this.request({
      url: 'classic/latest',
      success: (res)=>{
        callback(res);
        this._setLatestIndex(res.index);
      }
    })
   }
   getMyFavor(success){
     const params = {
       url: 'classic/favor',
       success: success
     }
     this.request(params);
   }
   isFirst(index) {
     return index === 1;
   }
   isLatest(index) {
     let latestIndex = this._getLatestIndex();
     return index === latestIndex;
   }
  _setLatestIndex(index){
    wx.setStorageSync('latest' ,index)
  }   
  _getLatestIndex() {
   return wx.getStorageSync('latest');
  }   
}