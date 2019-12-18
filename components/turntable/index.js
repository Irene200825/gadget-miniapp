var radius = 0;
var timeOut;
//0 - 9就是对应的抽奖奖品顺序
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theme: { //图片
      type: Object,
      value: {
        turntable_img: "http://q2hm9j7q7.bkt.clouddn.com/foArDrdGkv.png", //转盘
        pointer_img: "http://q2hm9j7q7.bkt.clouddn.com/ul7XkZrt45.png" //指针
      }
    },
    customFunction: {
      type: Object,
      value: {
        onStart: function() {
          return;
        },
        onEnd: function() {}
      }
    },
    awards: { //奖品列表
      type: Array,
      value: [1,2,3,4,5]
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    rotateTime: 3,
    isCanClick: true,
    turntableImagePath: "",
    rotateAngle: 0,
    winningOrder: 0,
    isShowResultDialog: false //显示中奖弹窗
  },
  attached: function() {
    this.drawTurntable();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /*
     *开始旋转
     */
    getRotateAngle: function(winningOrder) {
      var _this = this;
      var awards = _this.data.awards;
      var angle = 360 / (awards.length);
      var rotateAngle = parseInt(Math.random() * 2 + 1) + 360 * 5;
      rotateAngle += (360 - 90 - (winningOrder * angle + angle / 2));

      _this.setData({
        rotateAngle: rotateAngle
      })

      timeOut = setTimeout(function() {
        _this.setData({
          isShowResultDialog: true,
          isCanClick: true
        })
        _this.reset();
        _this.triggerEvent('end', {});
        _this.data.customFunction.onEnd();
      }, _this.data.rotateTime * 1000 + 500)
    },
    /**
     * 点击指针获得
     */
    startRaffle: function(event) {
      var _this = this;

      if (!_this.data.isCanClick) {
        return;
      }

      _this.setData({
        rotateTime: 3,
        isCanClick: false
      })

      _this.start(event);
    },

    /**
     * 开始执行
     */
    start: function(event) {
      var _this = this;
      //开始执行
      _this.triggerEvent('start', event);
      var startResult = _this.data.customFunction.onStart();
      startResult && startResult.then(function(res) {
          if (res.result < 0) {
            return;
          };
          _this.setData({
            winningOrder: res.result
          })
          _this.getRotateAngle(res.result);
        })
        .catch(function(error) {
          console.error("转盘onStart失败", error);
          _this.setData({
            isCanClick: true
          })
          wx.showToast({
            icon: 'none',
            title: error.message || error.error_msg || "网络繁忙，请稍后重试"
          })
        })
    },
    /**
     * 关闭弹窗
     */
    closeDialog: function() {
      this.setData({
        isShowResultDialog: false,
        isCanClick: true
      })
    },
    goBack:function(){
      wx.navigateBack()
    },
    /**
     * 重置转盘
     */
    reset: function() {
      this.setData({
        rotateTime: 0,
        rotateAngle: 0
      })
    },
    /**
     * 画转盘
     */
    drawTurntable: function() {
      //画转盘
      var _this = this;
      wx.createSelectorQuery().in(_this).select('#canvasTurntable').boundingClientRect(function(rect) {
        radius = parseInt(rect.width / 2);
        _this.drawTurntableItem();
      }).exec()
    },
    /**
     * 画转盘
     */
    drawTurntableItem: function() {
      var _this = this

      var awards = _this.data.awards;

      var ctx = wx.createCanvasContext('canvasTurntable', _this);
      var arc = Math.PI / (awards.length / 2);
      awards.forEach(function(award, awardIndex) {
        var angle = awardIndex * arc;

        //画等分线
        ctx.beginPath();
        ctx.setStrokeStyle('#f40');
        ctx.setLineWidth(1);
        ctx.moveTo(radius, radius);
        ctx.lineTo(radius + Math.cos(angle) * radius, radius + Math.sin(angle) * radius);
        ctx.stroke();
        ctx.save();

        //画奖品
        ctx.beginPath();
        ctx.setFontSize(24);
        ctx.setTextAlign('center');
        ctx.setFillStyle('#b76918');
        ctx.translate(radius + Math.cos(angle + arc / 2) * radius * 0.80, radius + Math.sin(angle + arc / 2) * radius * 0.80);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.fillText("菜" + (awardIndex + 1), 0, 0);

        // ctx.drawImage("/images/awards/" + awardsImg[awardIndex] + ".png", -(radius * 0.26) / 2, 4, (radius * 0.26), (radius * 0.26));
        ctx.restore(); //保存绘图上下文，使上一个绘制的扇形保存住。
        ctx.save();
      })
      ctx.draw();
      setTimeout(function() {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 2 * radius,
          height: 2 * radius,
          destWidth: 8 * radius,
          destHeight: 8 * radius,
          quality: 1,
          canvasId: 'canvasTurntable',
          success: function(res) {
            _this.setData({
              turntableImagePath: res.tempFilePath
            })
          },
          fail: function(res) {
            console.error("fail", res)
          }
        }, _this)
      }, 500);
    },
  }
})