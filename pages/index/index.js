//index.js
var sha1 = require('../../utils/sha1.js');
//获取应用实例
var app = getApp();
var api = app.data.api;
Page({
  data: {
    motto: '航天小秘',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
  },
  bindInvateTap: function() {
    wx.redirectTo({
      url: '../invate/invate'
    })
  },
  onLoad: function () {
    //console.log('onLoad')
    var that = this;
    //调用登录接口
    wx.login({
      success: function(res) {
        wx.getUserInfo({
          success: function (res) {
            //更新数据
            that.setData({
              userInfo:res.userInfo
            });
          }
        });
        if (res.code) {
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          console.log(res.code);

          //发起网络请求
          wx.request({
            url: api + 'login',
            data: {
              code: res.code,
              t:timestamp,
              s: sha1.hex_sha1(app.data.key + timestamp)
            },
            success: function(res) {
              console.log(res);
              wx.setStorageSync('token', res.data.token);
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
                    url: '../invate/invate'
                  })
              }
            },
            fail: function() {
              wx.showModal({
                title: '访问失败',
                content: '服务器连接失败，请退出后重试！',
                showCancel: false
              });
            }
          });
        } else {
          wx.showModal({
            title: '访问失败',
            content: '访问小程序失败，请退出后重试！',
            showCancel: false
          });
        }
      }
    })    
    
  }
})
