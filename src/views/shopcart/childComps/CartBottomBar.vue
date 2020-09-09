<template>
  <div class="bottom-bar">
    <check-button
      class="select-all"
      :isChecked="isSelectAll"
      @click.native="checkBtnClick"/>
    <span>全选</span>
    <span class="total-price">合计: {{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">结算{{checkedLength}}</span>
  </div>
</template>

<script>
  import CheckButton from  'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice(){
        return '¥' + this.cartList.filter(item => {
          return item.checked;
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0).toFixed(2);
      },
      checkedLength(){
        return this.cartList.filter(item => item.checked).length ? '('+this.cartList.filter(item => item.checked).length+')' : '';
      },
      isSelectAll(){
        if(this.cartList.length === 0) return false;
        return !this.cartList.find(item => !item.checked);
      }
    },
    methods: {
      checkBtnClick(){
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked = false);
        } else {
          this.cartList.forEach(item => item.checked = true);
        }
      },
      calcClick(){
        if(!this.cartList.length){
          this.$toast.show('购物车为空，请添加商品！', 1500);
        } else if(!this.checkedLength) {
          this.$toast.show('请选择购买的商品！', 1500);
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    height: 44px;
    line-height: 44px;
    padding-left: 35px;
    box-shadow: 0 -2px 2px rgba(100, 100, 100, .2);
    font-size: 14px;
    color: #888;
    background-color: #eee;
  }

  .bottom-bar .select-all {
    position: absolute;
    left: 12px;
    top: 13px;
  }

  .bottom-bar .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-bar .buy-product {
    float: right;
    width: 100px;
    height: 44px;
    text-align: center;
    color: #fff;
    background-color: orangered;
  }
</style>
