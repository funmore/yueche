var sha1=require('../../utils/sha1.js');
var app=getApp()
Page({
  data:{
    tabs: ['待审批', '待派车','待确认','待评价','全部'],
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0,
    role:'',
    //state: 0：待审查； 1：待派车 2：待确认  3：待评价  4：已完成
    orderArray:[
    {
        id: 0, 
        unique: 'unique_0',
        state:0,
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
      },
      {
        id: 0, 
        unique: 'unique_0',
        state:1,
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
      },
      {
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
      },
      {
        id: 0, 
        unique: 'unique_0',
        state:3,
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
      },
      {
        id: 1, 
        unique: 'unique_1',
        state:4,
        usetime:'2017-10-12 12:30:30',
        user_id:0,
        telephone:'13269387620',
        type:0,
        manager:0,
        reason: '办公',   //补全
        passenger:'周杰伦',
        mobilephone:'13931918486',
        isweekend:0,
        isreturn:0,
        workers:'五人',                                                   
        origin:['东院8号楼'],
        destination:['南苑研发中心','首都机场1','首都机场2'],
        remark:'无'
      }
    ]
  },
  onShow:function(options){
      var timestamp = Date.parse(new Date());
              timestamp = timestamp / 1000;
              wx.request({
                  url: 'test.php', //正吉url 获取订单
                  data: {
                     token:wx.getStorageSync('token'),
                     t:timestamp,
                     s:sha1.hex_sha1(app.data.key+timestamp),

                    
                  },
                  header: {
                      'content-type': 'application/json'
                  },
                  method:'GET',
                  success: function(res) {
                    //处理订单code
                    //处理订单codd end 
                  }
                })
  },
  
  onLoad:function(options){
    //联调使用
   //this.getBasicInfo();
   try {
      let {tabs} = this.data; 
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({stv: this.data.stv})
      this.tabsCount = tabs.length;
    } catch (e) {
    }

    // wx.getUserInfo({
    //     success: function(res) {
    //       var userInfo = res.userInfo
    //       var nickName = userInfo.nickName
    //       var avatarUrl = userInfo.avatarUrl
    //       var gender = userInfo.gender //性别 0：未知、1：男、2：女 
    //       var province = userInfo.province
    //       var city = userInfo.city
    //       var country = userInfo.country
    //     }
    //   })      

  },
  handlerStart(e) {
    let {clientX, clientY} = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({stv: this.data.stv})
  },
  handlerMove(e) {
    let {clientX, clientY} = e.touches[0];
    let {stv} = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if(stv.offset <= 0) {
      stv.offset = 0;
    } else if(stv.offset >= stv.windowWidth*(this.tabsCount-1)) {
      stv.offset = stv.windowWidth*(this.tabsCount-1);
    }
    this.setData({stv: stv});
  },
  handlerCancel(e) {

  },
  handlerEnd(e) {
    let {clientX, clientY} = e.changedTouches[0];
    let endTime = e.timeStamp;
    let {tabs, stv, activeTab} = this.data;
    let {offset, windowWidth} = stv;
    //快速滑动
    if(endTime - this.tapStartTime <= 300) {
      //向左
      if(this.tapStartX - clientX > 5) {
        if(activeTab < this.tabsCount -1) {
          this.setData({activeTab: ++activeTab})
        }
      } else {
        if(activeTab > 0) {
          this.setData({activeTab: --activeTab})
        }
      }
      stv.offset = stv.windowWidth*activeTab;
    } else {
      let page = Math.round(offset/windowWidth);
      if (activeTab != page) {
        this.setData({activeTab: page})
      }
      stv.offset = stv.windowWidth*page;
    }
    stv.tStart = false;
    this.setData({stv: this.data.stv})
  },
   _updateSelectedPageData(page){
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          wx.request({
              url: 'test.php', //正吉url
              data: {
                 token:wx.getStorageSync('token'),
                 t:timestamp,
                 s:sha1.hex_sha1(app.data.key+timestamp),

                 p:page
              },
              header: {
                  'content-type': 'application/json'
              },
              method:'GET',
              success: function(res) {
                console.log(res.data)
              }
            })
   },
  _updateSelectedPage(page) {
    let {tabs, stv, activeTab} = this.data;
    activeTab = page;
    this.setData({activeTab: activeTab})
    stv.offset = stv.windowWidth*activeTab;
    this.setData({stv: this.data.stv});
    this._updateSelectedPageData(page);
  },
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
  },
  checkOrder:function(e){
    var item=e.target.dataset.item;
    app.item=item;
    wx.navigateTo({
      url: "../indexInfo/checkOrder/checkOrder"
    })
  },
  confirmOrder:function(e){
    var item=e.target.dataset.item;
    wx.showModal({
        content: '确认完成乘车？',
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
                     

                     id:item.id
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
  }
})