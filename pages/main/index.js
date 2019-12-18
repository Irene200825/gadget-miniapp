const db = wx.cloud.database();
const mensesDb = db.collection('menses');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    weather: {
      'wea_img': 'qing'
    } //实况天气
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  addTime: function() {
    var _this = this;
    var time = _this.data.time;
    if (!time) {
      wx.showToast({
        icon: "none",
        title: '请选择时间'
      })
      return;
    }
    mensesDb.add({
      data: {
        time: time
      },
      success: function(res) {
        _this.setData({
          time: ""
        })
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        wx.showToast({
          title: '添加成功'
        })
      }
    })
  },
  goHistory: function() {
    wx.navigateTo({
      url: '/pages/main/menses/history',
    })
  },
  //天气api 要付钱的
  tianQiApi: function() {
    var _this = this;
    // 获取IP地址
    wx.request({
      url: 'https://tianqiapi.com/ip/',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        // console.log(res);
        // 根据IP获取天气数据
        _this.weathertoday(res.data.ip);
      }
    });
  },

  // 天气api实况天气
  weathertoday: function(ip) {
    var _this = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api/?version=v6',
      data: {
        'ip': ip
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        _this.setData({
          weather: res.data
        });
        console.log(_this.data.weather)
      }
    });
  }
})