

Page({
  data: {

    array_destination:['东院8号楼','东院研发楼','西院74号楼','其他地点'],
    index_destination:[0],
    destination:[''],
    destArray:[
      {id: 0, unique: 'unique_0'},
    ],
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindPickerDestination: function(e) {
    var id=e.target.dataset.itemId;
    this.data.index_destination[id]=e.detail.value;
    this.setData({
      index_destination: this.data.index_destination
    });
  },
  destInput:function(e){
    var id=e.target.dataset.itemId;
    this.data.destination[id]=e.detail.value;
    this.setData({
      destination:this.data.destination
    })
  },
  addOrigin:function(e){
    const length = this.data.destArray.length;
    if(length <= 5){
        this.data.destArray = this.data.destArray.concat([{id: length, unique: 'unique_' + length}]);
        this.data.index_destination=this.data.index_destination.concat([0]);
        this.data.destination=this.data.destination.concat('');
        this.setData({
          destArray: this.data.destArray,
          index_destination:this.data.index_destination
        });
        
      }else{
        wx.showModal({
          content: '最多6个出发地',
          showCancel:false,

        });
      } 
  },
  decOrigin:function(e){
    const length = this.data.destArray.length;
    if(length>=2){
        this.data.destArray.pop();
        this.data.index_destination.pop();
        this.setData({
          destArray: this.data.destArray,
          index_destination:this.data.index_destination
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
    var dest=new Array();
    for(var item in this.data.index_destination){
      var value = this.data.index_destination[item];
      if(value<=2){
        dest.push(this.data.array_destination[item]);
      }else{
        dest.push(this.data.destination[item]);
      }
    }
    prevPage.setData({
      dest: dest
    });
  }
}) 



