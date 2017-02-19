var sha1=require('../../utils/sha1.js');
var app=getApp();
// var origin=require('../orderInfo/origin/origin.js');
Page({
  data: {

    date: '2016-09-01',
    time: '12:01',
    array_keshi:['一室','二室','三室','四室'],
    index_keshi: 0,
    array_yongCheLeiXing:['管理','科研','横向'],
    index_yongCheLeiXing: 0,
    array_isOffWorkTime:['否','是'],
    index_isOffWorkTime:0,
    array_dest:['东院8号楼','东院研发楼','西院74号楼','其他地点'],
    index_dest:0,
    
    array_oneOrTwoWay:['否','是'],
    index_oneOrTwoWay: 0,

    workers:'',
    origin:[''],
    dest:[''],

    applyer:'',
    passenger:'',
    passengerTel:'',
    manager:'',
    destination:'',
    notes:'',

  },
 

  applyerInput:function(e){
    this.setData({
      applyer:e.detail.value
    })
  },
  reasonInput:function(e){
    this.setData({
      reason:e.detail.value
    })
  },
  managerInput:function(e){
    this.setData({
      manager:e.detail.value
    })
  },
  passengerInput:function(e){
    this.setData({
      passenger:e.detail.value
    })
  },
  passengerTelInput:function(e){
    this.setData({
      passengerTel:e.detail.value
    })
  },

  destInput:function(e){
    this.setData({
      destination:e.detail.value
    })
  },
  notesInput:function(e){
    this.setData({
      notes:e.detail.value
    })
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindPickerKeshiChange: function(e) {
    this.setData({
      index_keshi: e.detail.value
    })
  },
  bindPickerYongcheleixingChange: function(e) {
    this.setData({
      index_yongCheLeiXing: e.detail.value
    })
  },
  bindPickerIsOffWorkTime: function(e) {
    this.setData({
      index_isOffWorkTime: e.detail.value
    })
  },
  bindPickerOneOrTwoWayChange: function(e) {
    this.setData({
      index_oneOrTwoWay: e.detail.value
    })
  },
  bindWorkerNeedsInput: function(e) {
    this.setData({
      workers: e.detail.value
    })
  },
  applyForCar:function(e){
    var data=this.data;
    wx.showModal({
        content: '确定提交用车申请？',
        success: function(res) {
          var a=data;
            if(res.confirm){
              var timestamp = Date.parse(new Date());
              timestamp = timestamp / 1000;
              wx.request({
                  url: 'test.php', //正吉url
                  data: {
                     token:wx.getStorageSync('token'),
                     t:timestamp,
                     s:sha1.hex_sha1(app.data.key+timestamp),
                     
                     usetime:data.date+" "+data.time+":00",
            
                     //user_id:
                     //telephone:
            
                     type:data.index_yongCheLeiXing,
                     manager:data.manager,
                     reason: data.reason,   //补全
                     passenger:data.passenger,
                     mobilephone:data.passengerTel,
                     isweekend:data.index_isOffWorkTime,
                     isreturn:data.index_oneOrTwoWay,
                     workers:data.workers,

                     origin:data.origin,
                     dest:data.dest,
                     remark:data.notes
                     // applyer:data.applyer,
                     // keshi:data.index_keshi,                                                    
                     // departIndex:data.index_departure,
                     // departLocation:data.departure,
                     // destIndex:data.index_dest,
                     // destLocation:data.destination,
                     // notes:data.notes
                  },
                  header: {
                      'content-type': 'application/json'
                  },
                  method:'POST',
                  success: function(res) {
                    if(res.data.state==1){
                      wx.redirectTo({
                            url: '../orderInfo/orderSuccess/orderSuccess',
                            fail:function(e){
                              wx.redirectTo({
                                url:'../orderInfo/orderFail/orderFail'
                              })
                            }
                          })
                    }else{
                      wx.redirectTo({
                        url:'../orderInfo/orderFail/orderFail'
                      })
                    }
                  }
                })
            }
        }
    });
    var a=0;
    
  }
})


          
          
