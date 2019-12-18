const URL_CONFIG = {
  'TYP_BAYMAX_SHOP': '/pages/shopDetail/index?shopUid=',
  'TYP_BAYMAX_REBATE': '/pages/rebateCard/index?promotionUid=',
  'TYP_BAYMAX_PRODUCT': '/pages/promotionProduct/detail?promotion_product_uid=',
  'TYP_BAYMAX_LOTTERY': '/pages/activeDetail/activeDetail?promotionType=lottery&promotionUid=',
  'TYP_BAYMAX_GIFT': '/pages/activeDetail/activeDetail?promotionType=gift&promotionUid=',
  'TYP_BAYMAX_MINA': '/pages/landingPage/index?lp_uid=',
  'TYP_BAYMAX_CARD': '/pages/signUpActivity/signUp/index?promotionUid=',
  'TYP_BAYMAX_AUCTION': '/pages/auction/index/index?promotionUid=',
  'TYP_SELECTION_PROMOTER': '/pages/user/registerPromoter/registerPromoter?invite_user_uid=',
}

module.exports = function(targetType, targetUrl, targetUid) {
  const urls = [
    "/pages/hot-sell/index",
    "/pdd/homePage/index",
    "/goldCoin/raiseGoldCoin/index",
    "/pages/shoppingTrolleys/index",
    "/pages/user/index"
  ];

  if (!targetType) {
    return false
  }
  if (targetType == 'TYP_BAYMAX_CUSTOM' && !targetUid && !targetUrl) {
    return false
  }
  if (targetType != 'TYP_BAYMAX_CUSTOM' && !targetUid) {
    return false
  }
  if (targetType == 'TYP_BAYMAX_CUSTOM') {
    var isUrl = urls.some(function(urlItem) {
      return targetUrl == urlItem;
    })
    if (isUrl) {
      wx.navigateToMiniProgram({
        appId: "wx98b9bcbc9161b0ec",
        path: targetUrl
      })
    } else if (targetUid) {
        wx.navigateToMiniProgram({
          appId: targetUid,
          path: targetUrl
        })
    } else {
      wx.navigateToMiniProgram({
        appId: "wx98b9bcbc9161b0ec",
        path: targetUrl
      })
    }
    return false;
  }
  const link = URL_CONFIG[targetType] || '';


  wx.navigateToMiniProgram({
    appId: "wx98b9bcbc9161b0ec",
    path: link + targetUid
  })
}