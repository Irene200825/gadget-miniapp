// pages/mainPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: 'man',
    name: '',
    number: +new Date() - 1545000000206,
    year: ""
  },
  onLoad: function() {
    var year = new Date().getFullYear() + 1;
    wx.setNavigationBarTitle({
      title: year + '年会发生的事情'
    })
    this.setData({
      year: year
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      number: +new Date() - 1545000000206
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  radioChange(e) {
    var sex = e.detail.value;
    if (sex == this.data.sex) {
      return;
    }
    this.setData({
      sex: sex
    })
  },
  inputName(e) {    
    this.setData({
      name: e.detail.value
    })
  },
  gotoPage() {


  },
  getUserInfo: function(e) {
    var sex = this.data.sex;
    var name = this.data.name;
    if (!name) {
      wx.showToast({
        icon: 'none',
        title: '请输入姓名'
      })
      return;
    }
    this.setData({
      userInfo: e.detail.userInfo
    })


    e.detail.userInfo && e.detail.userInfo.avatarUrl && wx.setStorageSync("avatarUrl", e.detail.userInfo.avatarUrl);

    wx.navigateTo({
      url: '/pages/result/index?sex=' + sex + '&name=' + name + '&avatarUrl=' + this.data.userInfo.avatarUrl
    })
  }
})