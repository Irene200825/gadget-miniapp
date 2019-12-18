'use strict';

//  店铺主页  TYP_BAYMAX_SHOP  
//  拼团返现  TYP_BAYMAX_REBATE  
//  商品链接  TYP_BAYMAX_PRODUCT  
//  红包链接  TYP_BAYMAX_LOTTERY  
//  礼品链接  TYP_BAYMAX_GIFT 
//  海报链接  TYP_BAYMAX_MINA
//  报名活动  TYP_BAYMAX_CARD
//  拍卖活动  TYP_BAYMAX_AUCTION
const URL_CONFIG = {
  'TYP_BAYMAX_SHOP': '/pages/shopDetail/index?shopUid=',
  'TYP_BAYMAX_REBATE': '/pages/rebateCard/index?promotionUid=',
  'TYP_BAYMAX_PRODUCT': '/pages/promotionProduct/detail?promotion_product_uid=',
  'TYP_BAYMAX_LOTTERY': '/pages/activeDetail/activeDetail?promotionType=lottery&promotionUid=',
  'TYP_BAYMAX_GIFT': '/pages/activeDetail/activeDetail?promotionType=gift&promotionUid=',
  'TYP_BAYMAX_MINA': '/pages/landingPage/index?lp_uid=',
  'TYP_BAYMAX_CARD':'/pages/signUpActivity/signUp/index?promotionUid=',
  'TYP_BAYMAX_AUCTION': '/pages/auction/index/index?promotionUid=',
  'TYP_SELECTION_PROMOTER': '/pages/user/registerPromoter/registerPromoter?invite_user_uid=',
}


module.exports = _type => {

  
  return URL_CONFIG[_type] || '';
}