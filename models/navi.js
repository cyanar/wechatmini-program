import HTTP from '../util/http.js';
export default class NaviModel extends HTTP {
   getClassic(type,index,callback){
    let url = `classic/${index}/${type}`;
    let key = type === 'next' ? this._getKey(index+1): this._getKey(index-1);
    let classic = wx.getStorageSync(key);
     if(!classic){
      this.request({
        url,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          callback(res);
        }
      })
    }else {
      callback(classic);
    }
   
   }
   _getKey(index){
     let key = 'classic-' + index;
     return key;
   }
}