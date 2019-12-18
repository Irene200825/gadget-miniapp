App({
  onLaunch: function () {
    //云开发初始化
    wx.cloud.init({
      env: 'anzitqdev-0b08f3',
      traceUser: true
    })
  }
})