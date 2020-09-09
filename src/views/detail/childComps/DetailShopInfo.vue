<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.shopLogo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'high-score': item.isBetter}">{{item.score}}</td>
            <td class="level" :class="{'high-level': item.isBetter}"><span>{{item.isBetter? '高': '低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + "万";
      }
    }
  }
</script>

<style scoped>
  .shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }

  .shop-top {
    line-height: 45px;
    display: flex;
    align-items: center;
  }

  .shop-top img {
    width: 45px;
    height: 45px;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 50%;
  }

  .shop-top span {
    margin-left: 10px;
  }

  .shop-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }

  .sells-count, .goods-count {
    font-size: 15px;
  }

  .sells-text, .goods-text {
    margin-top: 10px;
    font-size: 13px;
  }

  .shop-middle-right {
    font-size: 13px;
    color: #333;
    margin-left: 30px;
  }

  .shop-middle-right table {
    width: 120px;
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .high-score {
    color: #f13e3a;
  }

  .shop-middle-right .level span{
    background-color: #5ea732;
    color: #fff;
  }

  .shop-middle-right .high-level span{
    background-color: #f13e3a;
  }

  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    width: 150px;
    height: 30px;
    font-size: 14px;
    background-color: #f2f5f8;
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
  }
</style>
