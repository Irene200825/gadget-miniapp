const db = wx.cloud.database();
const mensesDb = db.collection('menses');
var pageData={
  pageNo:0,
  pageSize:20
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: wx.getStorageSync("openId"),
    historyList:[],
    noData:false
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
    this.getList();
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
    this.getList();
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
          openId: userInfo.openId
        })
        wx.setStorageSync("openId", userInfo.openId);
        that.getList();
      }
    })
  },
  getList:function(){
    var _this=this;
    if (!wx.getStorageSync("openId")) {
      _this.getOpenid();
      return;
    }
    if (!wx.getStorageSync("openId")){
      wx.showToast({
        icon:"none",
        title: '网络开了小差，下次再来试试吧！'
      })
      return;
    }
    if (_this.data.noData){
      return;
    }

    var historyList=_this.data.historyList;

    mensesDb.where({
      '_openid': wx.getStorageSync("openId")
    })
      .orderBy("time", "desc")
      .skip(historyList.length)
      .limit(pageData.pageSize)
      .get({
        success: function (res) {
          if (res.errMsg != "collection.get:ok") {
            return;
          }
          console.log(res)
          var content = res.data;
          if (content.length < pageData.pageSize){
            _this.setData({
              noData:true
            })
          }
          _this.setData({
            historyList: historyList.concat(content)
          })
        }
      })
  }
})