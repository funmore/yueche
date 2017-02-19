Page({
  data: {

  },
  backHome:function(e){
      wx.redirectTo({
          url: '../../index/index'
        });
    },
  reOrder:function(e){
    wx.redirectTo({
      url:'../../add/add'
    })
  }
})



