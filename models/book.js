import HTTP from '../util/http-p.js';
export default class BookModel extends HTTP {
  getHotBook(){
    return this.request({
      url:"/book/hot_list"
    })
  }
  getDetail(bid){
    return this.request({
      url:`/book/${bid}/detail`
    })
  }
  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }
  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }
  getMyBookCount(){
    return this.request({
      url: '/book/favor/count'
    })
  }
  search(start,q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
          q,
          start
      }
    })
  }
}