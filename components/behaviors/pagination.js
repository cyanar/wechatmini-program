export const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: 0,
    noneResult: false
  },
  methods: {
    initialize(){
      this.setData({
        dataArray: [],
        total: 0,
        noneResult: false
      })
    },
    setMoreData(dataArray){
       const tempArray = this.data.dataArray.concat(dataArray);
       this.setData({
         dataArray: tempArray
       })
    },
    getCurrentStart(){
      return this.data.dataArray.length
    },
    setTotal(total){
      this.data.total = total;
      if(total === 0){
        this.setData({
          noneResult: true
        })
      }
    },
    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false;
      }else{
        return true;
      }
    }
  }
})