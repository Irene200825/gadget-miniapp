// pages/eat/lottery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods:[],
    customFunction: {
      onStart: function() {
        return;
      },
      onEnd: function() {}
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this=this;
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 2];
    if (currentPage && currentPage.data){
      var foods = currentPage.data.foods||[];
      this.setData({
        foods: foods,
        'customFunction.onStart':function(){
          return new Promise((resolve,reject)=>{
            var result = _this.randomNumBoth(0, foods.length-1);
            resolve({
              result: result
            })
          })
        }
      })

    }
    
  },
  randomNumBoth: function(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    console.log(num)
    return num;
  }

})