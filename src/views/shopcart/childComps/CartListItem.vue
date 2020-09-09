<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button :isChecked="itemInfo.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">¥{{itemInfo.price}}</div>
        <div class="item-count">×{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartListItem",
    props: {
      itemInfo: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick(){
        this.itemInfo.checked = !this.itemInfo.checked;
      }
    }
  }
</script>

<style scoped>
  .cart-list-item {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    overflow: hidden;
    position: relative;
  }

  .item-title, .item-desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
  }

  .info-bottom .item-count {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
