<template>
  <div class="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车{{cartLength}}</div>
    </nav-bar>
    <scroll class="scroll">
      <cart-list/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Shopcart",
    components: {
      NavBar,
      CartList,
      CartBottomBar,
      Scroll
    },
    computed: {
      ...mapGetters([
        'cartList'
      ]),
      cartLength(){
        return this.cartList.length? '('+this.cartList.length+')': ''
      }
    }
  }
</script>

<style scoped>
  .shop-cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .scroll {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 93px;
    left: 0;
    right: 0;
  }
</style>
