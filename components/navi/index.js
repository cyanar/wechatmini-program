// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    index: {
      type: Number
    },
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: 'images/triangle@left.png',
    rightSrc: 'images/triangle@right.png',
    disLeftSrc: 'images/triangle.dis@left.png',
    disRightSrc: 'images/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onNext: function(){
      if(this.properties.first) return;
      this.triggerEvent('next', {
        next:22
      });
    },
    onPrev: function () {
      console.log(this.properties.latest);
      if(this.properties.latest) return;
      this.triggerEvent('prev', {
        next: 22
      });
    }
  }
})
