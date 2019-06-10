// components/like/index.js
import HTTP from '../../util/http.js';
let http = new HTTP();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     like: {
       type:Boolean
     },
     type: {
       type:Number
     },
     count: {
       type: Number
     },
     id: {
       type: Number
     },
     readOnly: {
       type: Boolean
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesPic: 'images/like.png',
    noPic: 'images/like@dis.png'
  },
  /**
   * 组件的方法列表
   */
  methods: {
      onLike: function(event){
        if(this.properties.readOnly) return;
           let {like,count} = this.properties;
          count = like?count-1 : count+1;
          this.setData({
            count,
            like:!like
          })
        console.log(this.properties.id,this.properties.type)
        let behavior = like ? 'cancel' : 'like';
        this.triggerEvent('like',{
          behavior
        });
          console.log(event)
      }
  }
})
