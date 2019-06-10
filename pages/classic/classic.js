// pages/classic/classic.js
import ClassicModel from '../../models/classic.js';
let classicModel = new ClassicModel(); 
import LikeModel from '../../models/like.js';
let likeModel = new LikeModel(); 
import NaviModel from '../../models/navi.js';
let naviModel = new NaviModel(); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
     classic: {},
     latest: true,
     first: false,
     likeCount: 0,
     likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     classicModel.getLatest(res => {
       console.log(res);
       this.setData({
         classic:res,
         likeCount:res.fav_nums,
         likeStatus: res.like_status
       })
     })
  },

  onLike: function(event) {
     console.log(event);
     let {behavior} = event.detail;
     let {id, type} = this.data.classic;
     likeModel.onLike(behavior,id,type);
  },
  onNext: function(event){
    this._updateClassic('previous')
  },
  _updateClassic: function (nextOrPrevious) {
    let { index } = this.data.classic;
    naviModel.getClassic(nextOrPrevious,index,res=> {
      this._getLikeStatus(res.id,res.type);
      this.setData({ 
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index) 
      })
    });
  },

  onPrev: function (event) {
    this._updateClassic('next')
  },
  _getLikeStatus: function(artId,type){
    likeModel.getClassicLikeStatus(artId,type,(res)=>{
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})