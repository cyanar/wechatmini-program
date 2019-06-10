import HTTP from '../util/http.js';
export default class LikeModel extends HTTP {
   onLike(behavior,art_id,category){
    let url = behavior === 'like' ? 'like' : 'like/cancel';
    let data = {
      art_id,
      type: category
    }
    this.request({
      url,
      data,
      method: 'POST'
    })
   }
 
   getClassicLikeStatus(artID,type,callBack){
     this.request({
       url: `classic/${type}/${artID}/favor`,
       success: callBack
     })
   }
}