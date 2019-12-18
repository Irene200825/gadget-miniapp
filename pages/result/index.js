var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;
var jumpLink = require("../../utils/jumpLink.js");
var results = [
  "被嘲单身狗 恋爱脱单 陷入三角恋关系 看破红尘，出家静修",
  "有人请吃饭 又有人请吃饭 胖三斤 胖五斤 胖十斤",
  "一夜暴富 突然破产 重新创业 身家过亿 写成自传",
  "拍了一条抖音 点赞破千万 网络爆红 被王思聪关注 坐拥千万粉丝",
  "恋爱 恢复单身 单身 继续单身 成为单身大佬",
  "桃花债上门 参加非诚勿扰 牵手成功 闪婚 生娃",
  "高5cm 瘦5斤 彩票中奖 升职 涨工资",
  "瘦两斤 瘦两斤 瘦两斤 瘦两斤 胖十斤",
  "吃 吃吃 吃吃吃 吃吃吃吃 胖十斤",
  "升职 升职 升职 升职 走向人生巅峰",
  "单身 还是单身 继续单身 一直单身 彻底单身",
  "辛勤工作 事业上升 突然破产 中1500万大奖 成为人生赢家",
  "恋爱 结婚 生孩子 养一只猫 养一条狗",
  "沉迷学习，日渐消瘦 渐消瘦 消瘦 瘦 瘦",
  "工作 工作 工作 工作 工作",
  "胖30斤 下决心减肥 成为健身达人 进军模特界 创立潮牌",
  "恋爱 热恋 开始厌烦 持续厌烦 恢复单身",
  "脱单 分手 升职 复合 奉子成婚",
  "减肥 减肥 减肥 狂吃 胖十斤",
  "旅游 偶遇爱豆  被表白 恋爱 被求婚",
  "赚钱 暴富 各种应酬 尝试养生 胖30斤",
  "恋爱 失恋 把恋爱经历写成小说 小说大卖 成为知名作家",
  "摄影 钻研摄影 继续钻研摄影 成为知名摄影师 环球旅拍",
  "尝试赚钱 尝试暴富 尝试自我提升 尝试优雅地活着 活着",
  "去旅游 瘦5斤 长高3厘米 被喜欢的人告白 走向人生巅峰",
  "被朋友催婚 陪父母催婚 被亲戚催婚 一直被催婚 从未停止",
  "去旅游 偶遇暗恋对象 被告白 陷入热恋 顺利",
  "上课 上课 上课 上课 上课",
  "学习 学习 学习 学习 学习"
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    result: [],
    wxCanvas: null // 注意这里 需要创建一个对象来接受wxDraw对象
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var year = new Date().getFullYear() + 1;
    wx.setNavigationBarTitle({
      title: year+'年会发生的事情'
    })
    var name = options.name;
    var sex = options.sex;
    var avatarUrl = options.avatarUrl || wx.getStorageInfoSync("avatarUrl");
    var result = results[Math.floor(Math.random() * results.length)].split(' ');
    this.setData({
      result: result
    })

    var systemInfo = wx.getSystemInfoSync();
    var base = systemInfo.windowWidth / 750;
    var width = systemInfo.windowWidth - 30;
    var height = systemInfo.windowWidth / 750 * 1017;
    var context = wx.createCanvasContext('resultCanvas'); //还记得 在wxml里面canvas的id叫first吗
    this.wxCanvas = new wxDraw(context, 15, 0, width, height);
    //初始化wxDraw对象 注意这里除了context的四个参数 就是canvas的位置以及长宽，😏还记得吗？

   wx.showLoading({
     title: '分析中'
   })
   
    var  headImg = avatarUrl.replace("http:", "https:")

    wx.downloadFile({
      url: headImg,
      success: function (res) {
        let img = new Shape('image', {
          x: width / 2,
          y: 48,
          w: 130 * base,
          h: 130 * base,
          needGra: 'circle',
          file: res.tempFilePath
        }, 'fill', true)
        _this.wxCanvas.add(img); //添加到canvas上面

        let bgImg = new Shape('image', {
          x: width / 2,
          y: height / 2,
          w: width,
          h: height,
          file: "/images/resultBg.png"
        }, 'fill', true)
        _this.wxCanvas.add(bgImg); //添加到canvas上面



        result.forEach(function (resultText, index) {
          var x = base * 80;
          var y = base * (354 + 91 * index);
          var fontSize = base * 20 * 2;
          resultText = index + 1 + ". " + resultText;
          let text = new Shape('text', {
            x: x,
            y: y,
            text: resultText,
            fontSize: fontSize,
            fillStyle: "#333"
          }, 'fill', true)
          _this.wxCanvas.add(text); //添加到canvas上面
        })

     
        var yearTitle = year + "年会发生的事情";
        var x = (width - context.measureText(yearTitle).width / 12 * 16) / 2 - 8;
        var y = base * 250;
        var fontSize = base * 16 * 2;
        let yearText = new Shape('text', {
          x: x,
          y: y,
          text: yearTitle,
          fontSize: fontSize,
          fillStyle: "#333"
        }, 'fill', true)
        _this.wxCanvas.add(yearText); //添加到canvas上面

        var nameX = (width - context.measureText(name).width / 12 * 16) / 2;
        var nameY = base * 202;
        var nameFontSize = base * 16 * 2;
        let text = new Shape('text', {
          x: nameX,
          y: nameY,
          text: name,
          fontSize: nameFontSize,
          textAlign: "center",
          fillStyle: "#333"
        }, 'fill', true)
        _this.wxCanvas.add(text); //添加到canvas上面
        wx.hideLoading();
        _this.setData({
          loading:false
        })
      }
    })


  



   
   



  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "未来会发生的事情",
      path: "/pages/mainPage/index"
    }
  },
  saveResult(){
    wx.canvasToTempFilePath({
      　　　　//通过id 指定是哪个canvas
      canvasId: 'resultCanvas',
      success(res) {
        　　　　　//成功之后保存到本地
        wx.saveImageToPhotosAlbum({

          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            console.error("保存失败",res)
          }
        })
      }
    })

  },
  goToDetail(event){
    const data = event.currentTarget.dataset;
    const targetType = data.target_type;
    const targetUrl = data.target_url;
    const targetUid = data.target_uid;
    jumpLink(targetType, targetUrl, targetUid);
  },
  back(){
    wx.navigateBack({
      
    })
  }
})