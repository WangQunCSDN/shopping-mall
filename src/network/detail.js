import {request} from './request';

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class Goods{
  constructor(itemInfo, columns, shopInfo){
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.realPrice = itemInfo.lowNowPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = shopInfo.services;
  }
}

export class Shop{
  constructor(shopInfo){
    this.shopLogo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.sells = shopInfo.cSells;
    this.goodsCount = shopInfo.cGoods;
    this.score = shopInfo.score;
  }
}

export class GoodsParams{
  constructor(info, rule){
    // 注: images可能没值(某些商品有值，某些没值)
    this.image = info.images? info.images[0] : '';
    this.set = info.set;
    this.sizes = rule.tables;
  }
}
