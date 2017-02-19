//app.js
var sha1 = require('utils/sha1.js');
App({
  data: {
    key: 'GKy2riERcMybIbSimP8zWT5TvrIlrgnn',
    userInfo:null
  },
  onLaunch: function () {
    this.getBasicInfo()
  },
  getBasicInfo(){
    //console.log('onLoad')
    var that = this;
    //调用登录接口
    wx.login({
      success: function(res) {
        wx.getUserInfo({
          success: function (res) {
            //更新数据
            that.data.userInfo=res.userInfo;
            // that.setData({
            //   userInfo:that.data.userInfo
            // });
          }
        });
        if (res.code) {
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          //发起网络请求
          wx.request({
            url: 'http://localhost/api/login',
            data: {
              code: res.code,
              t:timestamp,
              s: sha1.hex_sha1(that.data.key + timestamp)
            },
            success: function(res) {
              wx.setStorageSync('token', res.data.token);
              wx.setStorageSync('role', res.data.role);

              var role = res.data.role;
              if (role == 'employee') {
    
              }
              else if (role == 'admin') {
                this.data.tabs=this.data.tabs.concat(['用车调度']);
                this.setData({
                    tabs: this.data.tabs
                  });
              }
              else if (role == 'company') {
                
              }
              else {
                that.setData({
                  motto: '您的微信未被授权，点击输入邀请码'
                })
              }
            }
          })
        } else {
  
        }
      }
    }) 
  }
})