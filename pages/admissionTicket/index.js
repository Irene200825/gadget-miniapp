var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: 'man',
    name: '',
    school: '',
    isShow: false
  },

  onLoad: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


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
  inputSchoolName(e) {
    this.setData({
      school: e.detail.value
    })
  },
  getAdmissionTicket() {
    var _this = this;
    var data = _this.data;
    var name = data.name || "/";
    var sex = data.sex;
    var school = data.school || "/";
    var sexText = sex == "man" ? "男" : "女";
    var year=new Date().getFullYear();

    var systemInfo = wx.getSystemInfoSync();
    var base = systemInfo.windowWidth / 375;
    var width = systemInfo.windowWidth;
    var height = base * 502;

    var context = wx.createCanvasContext('resultCanvas'); //还记得 在wxml里面canvas的id叫first吗


    context.drawImage("../../images/admissionTicket.jpg", 0, 0, width, height)


    context.setFillStyle('#3e3b36') //文字颜色：默认黑色
    context.font = "normal normal 12px SimSun";
    context.setFontSize(18) //设置字体大小，默认10
    context.fillText(year, 78 * base, 83 * base); //绘制文本


    context.font = "normal bold 12px SimSun";
    context.setFontSize(12) //设置字体大小，默认10
    context.fillText(name, 190 * base, 196 * base); //绘制文本

    context.fillText(sexText, 300 * base, 196 * base); //绘制文本

    context.fillText(school, 190 * base, 228 * base); //绘制文本



    var seatNumber = Math.ceil(Math.random() * 59 + 1);
    context.fillText(seatNumber, 300 * base, 259 * base); //绘制文本

    var examinationRoom = Math.ceil(Math.random() * 39 + 1);
    context.fillText(examinationRoom, 190 * base, 259 * base); //绘制文本


    // 学校 + 考场 + 座位号
    var admissionTicketNo = "";
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(function(value, index) {
      if (!index) {
        admissionTicketNo += Math.round(Math.random() * 9 + 1)
      } else {
        admissionTicketNo += Math.round(Math.random() * 10)
      }
    })
    admissionTicketNo += (examinationRoom + "").padStart(2, 0) + (seatNumber + "").padStart(2, 0);
    context.fillText(admissionTicketNo, 220 * base, 162 * base); //绘制文本

    context.draw();

    _this.setData({
      isShow: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "准考证生成",
      path: "/pages/admissionTicket/index",
      imageUrl: "/images/share.jpg"
    }
  },
  saveResult() {
    wx.canvasToTempFilePath({
      //通过id 指定是哪个canvas
      canvasId: 'resultCanvas',
      success(res) {
        //成功之后保存到本地
        wx.saveImageToPhotosAlbum({

          filePath: res.tempFilePath,
          success: function(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function(res) {
            console.error("保存失败", res)
          }
        })
      }
    })

  }
})