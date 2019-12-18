// pages/main/mainPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
    if (!wx.getStorageSync("openId")){
      this.getOpenid();
    }
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {

        if (res.errMsg != 'cloud.callFunction:ok') {
          return;
        }

        console.log(res.result.event.userInfo)
        var userInfo = res.result.event.userInfo;
        that.setData({
          userInfo: userInfo
        })
        wx.setStorageSync("openId", userInfo.openId)
      }
    })
  },
  goPage(event){
    if (!wx.getStorageSync("openId")) {
      this.getOpenid();
    }
    var pageUrl=event.currentTarget.dataset.url;
    wx.navigateTo({
      url: pageUrl
    })
  }
})