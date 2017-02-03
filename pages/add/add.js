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
    array_departure:['A','B','C','其他地点'],
    index_departure:0,
    condition_departure:0
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
    if(e.detail.value=3){
      condition_departure: 1
    }else{
      condition_departure: 0
    }
  }
})