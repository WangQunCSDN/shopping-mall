<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsListItem.title}}</p>
      <span class="price">{{goodsListItem.price}}</span>
      <span class="collect">{{goodsListItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsListItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      showImage(){
        return this.goodsListItem.image || this.goodsListItem.show.img
      }
    },
    methods: {
      imageLoad(){
        this.$EventBus.$emit('itemImageLoad');
      },
      goodsItemClick(){
        this.$router.push({
          path: '/detail',
          query: {
            id: this.goodsListItem.iid,
          }
        })
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%
  }

  .goods-list-item img {
    width: 100%;
  }

  .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
  }

  .goods-info p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before{
    content: '';
    position: absolute;
    top: 0;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0;
    background-size: 14px 14px;
  }
</style>
