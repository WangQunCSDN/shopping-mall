<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(item, index) in cartList"
      :itemInfo="item"
      :key="index"/>
  </div>
</template>

<script>
  import CartListItem from './CartListItem'
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    computed: {
      ...mapGetters([
        'cartList'
      ])
    },
    components: {
      CartListItem
    }
  }
</script>

<style scoped>

</style>
