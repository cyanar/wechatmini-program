// components/episode/index.js
const months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     index: {
       type: Number,
       observer: function(newVal,oldVal,changePath){
         let val = newVal < 10 ? '0'+newVal : newVal;
         this.setData({
           _index:val
         })
         console.log(newVal,oldVal,changePath);
       }
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _index: '',
    year:0,
    month:''
  },
  
  attached: function(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    this.setData({
      year,
      month:months[month]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
