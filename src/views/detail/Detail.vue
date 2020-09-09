<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNav"/>
    <scroll class="scroll"
            ref="scroll"
            :probeType="3"
            @getScrollPosition="getScrollPosition">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <detail-recommend-info :recommends="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, getRecommend, Goods, Shop, GoodsParams} from "network/detail";
  import {BACKTOP_DISTANCE} from 'common/const';
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import {mapActions} from 'vuex';

  export default {
    name: "Detail",
    data(){
      return {
        id: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 1.保存传入的id
      this.id = this.$route.query.id;

      // 2.根据id请求详情数据
      getDetail(this.id).then(res => {
        const data = res.result;
        // console.log(data);
        // 1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;

        // 2.获取商品信息
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo);

        // 3.获取店铺信息
        this.shopInfo = new Shop(data.shopInfo);

        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo;

        // 5.获取参数信息
        this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);

        // 6.获取评论信息
        this.commentInfo = data.rate.cRate ? data.rate.list[0]:{};
      });

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });

      // 4.给getThemeTopY赋值(防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0, this.$refs.param.$el.offsetTop, this.$refs.comment.$el.offsetTop, this.$refs.recommend.$el.offsetTop, Number.MAX_VALUE);
      }, 100)
    },
    destroyed(){
      this.$EventBus.$off('itemImageLoad', this.itemImgListener);
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      Scroll
    },
    methods: {
      ...mapActions(['addCart']),
      detailImageLoad(){
        this.newRefresh();
        this.getThemeTopY();
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
      },
      getScrollPosition(position) {
        // 1.获取y值
        const positionY = -position.y;
        let length = this.themeTopYs.length;

        // 2.positionY和主题中值对比
        for(let i = 0; i<length-1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex;
          }
        }

        // 3.是否显示回到顶部
        this.isShowBackTop = positionY > BACKTOP_DISTANCE;
      },
      addToCart(){
        // 1.获取购物车需要展示的信息
        const product = {};
        product.iid = this.id;
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.desc = this.goodsInfo.desc;
        product.price = this.goodsInfo.realPrice;

        // 2.将商品添加到购物车里
        this.addCart(product).then(res => {
          this.$toast.show(res, 1500);
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .scroll {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
