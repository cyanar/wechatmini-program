// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js';
const mMgr = wx.getBackgroundAudioManager();
Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    typeImage: 'images/music@tag.png',
    playing: false
  },
  attached: function(event) {
    this._recoverStatus();
    this._monitorSwitch();
  },
  detached: function(event) {
    // mMgr.stop();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(){
      this.setData({
        playing: !this.data.playing
      });
      mMgr.title = this.properties.title;
      if(this.data.playing){
        mMgr.src = this.properties.src;
      }else {
        mMgr.pause();
      }
  
    },
    _recoverStatus:function() {
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return;
      }
      if(mMgr.src === this.properties.src){
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function(){
      mMgr.onPlay(()=>{
        this._recoverStatus();
      })
      mMgr.onPause(() => {
        this._recoverStatus();
      })
      mMgr.onStop(() => {
        this._recoverStatus();
      })
      mMgr.onEnded(() => {
        this._recoverStatus();
      })
    }
  }
})
