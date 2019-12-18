wx.cloud.init({
  env: 'anzitqdev-0b08f3',
  traceUser: true,
});
const db = wx.cloud.database();
const foodsDb = db.collection('foods');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods: []
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  formReset: function() {
    this.setData({
      foods: []
    })
  },
  formSubmit: function(e) {
    var submitData = e.detail.value;
    var foods = [];
    for (var food in submitData) {
      submitData[food] && foods.push(submitData[food]);
    }

    if (foods.length < 2) {
      wx.showToast({
        icon: 'none',
        title: '最少填写两个个'
      })
      return;
    }

    this.setData({
      foods: foods
    })

    this.insertDb(foods);

    setTimeout(function() {
      wx.navigateTo({
        url: '/pages/eat/lottery',
      })
    }, 500)
  },
  insertDb: function(foods) {

    foods.forEach(function(food) {
      foodsDb.where({
          food_name: food
        })
        .get({
          success: function(res) {
            if (res.errMsg != "collection.get:ok") {
              return;
            }
            if (res.data && res.data.length > 0) {
              foodsDb.doc(res.data[0]._id).update({
                // data 传入需要局部更新的数据
                data: {
                  // 表示将 done 字段置为 true
                  food_index: res.data[0].food_index + 1
                },
                success: function(res) {
                  console.log("update", res.data)
                }
              })
              return;
            }
            foodsDb.add({
              data: {
                food_name: food,
                food_index: 1
              },
              success: function(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log("add", res)
              }
            })


          }
        })

    })

  },
  getTop: function() {
    var _this=this;

    foodsDb.field({
      "food_name": true
    }).orderBy("food_index", "desc").limit(9).get().then(function(result){
      if (result.errMsg != "collection.get:ok" || (result.data && result.data.length <= 0)){
        return;
      }

     
      var foods = result.data.map(function(hotFood){
        return hotFood.food_name;
      })

      _this.setData({
        foods:foods
      })
    })
  }

})