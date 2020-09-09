import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      // 1.查找之前数组中是否含有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      // 2.判断oldProduct
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('加入购物车成功！');
      }else {
        payload.count = 1;
        payload.checked = false;
        context.commit(ADD_TO_CART, payload);
        resolve('加入购物车成功！');
      }
    })
  }
}
