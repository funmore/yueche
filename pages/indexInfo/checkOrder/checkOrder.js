var app=getApp()

Page({
  data: {
    item:{
        id: 0, 
        unique: 'unique_0',
        state:2,
        usetime:'2017-10-12 12:30:30',
        user_id:0,
        telephone:'13269387620',
        type:0,
        manager:0,
        reason: '办公',   //补全
        passenger:'丽丽',
        mobilephone:'13207692533',
        isweekend:0,
        isreturn:0,
        workers:'五人',                                                   
        origin:['东院8号楼'],
        destination:['南苑研发中心','首都机场'],
        remark:'无'
      }
  },
  onLoad: function (query) {
    var item=app.item;
    this.setData({
      item:item
    });
  }
})