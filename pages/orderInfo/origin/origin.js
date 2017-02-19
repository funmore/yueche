

Page({
  data: {

    array_departure:['东院8号楼','东院研发楼','西院74号楼','其他地点'],
    index_departure:[0],
    departure:[''],
    originArray:[
      {id: 0, unique: 'unique_0'},
    ],
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindPickerDeparture: function(e) {
    var id=e.target.dataset.itemId;
    this.data.index_departure[id]=e.detail.value;
    this.setData({
      index_departure: this.data.index_departure
    });
  },
  departInput:function(e){
    var id=e.target.dataset.itemId;
    this.data.departure[id]=e.detail.value;
    this.setData({
      departure:this.data.departure
    })
  },
  addOrigin:function(e){
    const length = this.data.originArray.length;
    if(length <= 5){
        this.data.originArray = this.data.originArray.concat([{id: length, unique: 'unique_' + length}]);
        this.data.index_departure=this.data.index_departure.concat([0]);
        this.data.departure=this.data.departure.concat('');
        this.setData({
          originArray: this.data.originArray,
          index_departure:this.data.index_departure
        });
        
      }else{
        wx.showModal({
          content: '最多6个出发地',
          showCancel:false,

        });
      } 
  },
  decOrigin:function(e){
    const length = this.data.originArray.length;
    if(length>=2){
        this.data.originArray.pop();
        this.data.index_departure.pop();
        this.setData({
          originArray: this.data.originArray,
          index_departure:this.data.index_departure
        })
    }else{
      wx.showModal({
          content: '最少1个出发地',
          showCancel:false,

        });
    }
  },
  saveData:function(e){

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var origin=new Array();
    for(var item in this.data.index_departure){
      var value = this.data.index_departure[item];
      if(value<=2){
        origin.push(this.data.array_departure[item]);
      }else{
        origin.push(this.data.departure[item]);
      }
    }
    prevPage.setData({
      origin: origin
    });
  }
}) 



