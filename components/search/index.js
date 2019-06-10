// components/search/index.js
import {paginationBev} from '../behaviors/pagination.js';
import KeywordModel from '../../models/keyword.js'; 
const keywordModel = new KeywordModel();
import BookModel from '../../models/book.js';
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
     more: {
       type:String,
       observer: 'loadMore'
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords: [],
    keywords: '',
    searching: false,
    loading: false,
    loadingCenter: false 
  },
  attached(){
    const historyWords = keywordModel.getHistory();

    this.setData({
      historyWords
    });

    keywordModel.getHot().then(res=>{
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      console.log(22333);
      if(this.data.loading) return;  
      if(!this.data.keywords) return;
      
      if(this.hasMore()){
        this.setData({
          loading: true
        })
        bookModel.search(this.getCurrentStart(), this.data.keywords)
          .then(res => {
            this.setMoreData(res.books);
            this.setData({
              loading: false
            })
          },()=>{
            this.setData({
              loading: false
            })
          })
      }
    },
     onDelete(event){
       this.initialize();
       this.setData({
         searching: false,
         keywords:' '
       })
     },
     onCancel(event){
       this.initialize();
       this.triggerEvent('cancel',{})
     },
     _showLoadingCenter(){
       this.setData({
         loadingCenter: true
       })
     },
     _hideLoadingCenter(){
       this.setData({
         loadingCenter: false
       })
     },
     onConfirm(event){
       this.setData({
         searching: true
       })
       this._showLoadingCenter();
       const word = event.detail.value || event.detail.text;
       this.setData({
         keywords: word
       })
       bookModel.search(0,word).then(res=>{
         this.setMoreData(res.books);
         this.setTotal(res.total);

         keywordModel.addToHistory(word);
         this._hideLoadingCenter();
       })
     }
  }
})
