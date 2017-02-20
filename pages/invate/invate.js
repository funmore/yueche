// pages/invate/invate.js
var sha1 = require('../../utils/sha1.js');
//获取应用实例
var app = getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  formSubmit: function(e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail)
    var that = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    wx.request({
      url: app.data.api + 'grant',
      data: {
        formId: e.detail.formId,
        code: e.detail.value.code,
        t:timestamp,
        s: sha1.hex_sha1(app.data.key + timestamp),
        token:wx.getStorageSync('token')
      },
      success: function(res) {
        wx.setStorageSync('role', res.data.role);

        var role = res.data.role;
        console.log(role);
        if (role == 'employee') {
          wx.redirectTo({
            url: '../order/order'
          })
        }
        else if (role == 'admin') {
          console.log('admin page');
          wx.redirectTo({
            url: '../admin/index'
          })
        }
        else if (role == 'company') {
          wx.redirectTo({
            url: '../company/index'
          })
        }
        else {
          wx.redirectTo({
            url: '../index/index'
          })
        }
      },
      fail: function() {
        wx.showModal({
          title: '访问失败',
          content: '访问小程序失败，请退出后重试！',
          showCancel: false
        });
      }
    })
  },
})