var sha1=require('../../utils/sha1.js');
var app=getApp();
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
    array_departure:['东院8号楼','东院研发楼','西院74号楼','其他地点'],
    index_departure:0,
    array_dest:['东院8号楼','东院研发楼','西院74号楼','其他地点'],
    index_dest:0,
    
    array_oneOrTwoWay:['否','是'],
    index_oneOrTwoWay: 0,

    array_workerNeeds:['不需要工人','需要1位工人','需要2位工人','需要3位工人','需要多位工人'],
    index_workerNeeds: 0,
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
  bindPickerDeparture: function(e) {
    this.setData({
      index_departure: e.detail.value
    });
  },
  bindPickerDest: function(e) {
    this.setData({
      index_dest: e.detail.value
    });
  },
  bindPickerOneOrTwoWayChange: function(e) {
    this.setData({
      index_oneOrTwoWay: e.detail.value
    })
  },
  bindPickerWorkerNeedsChange: function(e) {
    this.setData({
      index_workerNeeds: e.detail.value
    })
  },
  applyForCar:function(e){
    wx.showModal({
        content: '确定提交用车申请？',
        success: function(res) {
        if (res.confirm) {
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          wx.request({
              url: 'test.php', //正吉url
              data: {
                 token:wx.getStorageSync('token'),
                 t:timestamp,
                 s:sha1.hex_sha1(app.data.key+timestamp)
              },
              header: {
                  'content-type': 'application/json'
              },
              method:'POST',
              success: function(res) {
                console.log(res.data)
              }
            })
        }
  }
}) 
  }
})