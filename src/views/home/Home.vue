<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="titles"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isShow"/>
    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      @getScrollPosition="getScrollPosition"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="titles"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goodsList="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import {getHomeMultidata, getHomeGoods} from "network/home"
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {BACKTOP_DISTANCE, POP, NEW, SELL} from 'common/const';

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    data(){
      return {
        banners: [],
        recommends: [],
        titles: ['流行', '新款', '精选'],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: POP,
        tabOffsetTop: 0,
        isShow: false
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    deactivated(){
      // 取消全局事件的监听
      this.$EventBus.$off('itemImageLoad', this.itemImgListener);
    },
    created(){
      // 1.请求多个数据
      this.getHomeMultidata();

      // 2.请求商品数据
      this.getHomeGoods(POP);
      this.getHomeGoods(NEW);
      this.getHomeGoods(SELL);
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      /**
       *  事件监听相关的方法
       */
      tabClick(index){
        if(index === 0){
          this.currentType = POP;
        } else if(index === 1) {
          this.currentType = NEW;
        } else {
          this.currentType = SELL;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      getScrollPosition(position){
        // 1.判断 BackTop 是否显示
        this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE;

        // 2.决定 TabControl 是否吸顶展示
        this.isShow = (-position.y) >= this.tabOffsetTop;
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad(){
        // 获取tabControl的offsetTop
        // 所有的组件都有一个属性 $el: 用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }).catch(err => {
          console.log(err);
        });
      },
      getHomeGoods(type){
        let page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page++;

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: calc(100vh - 49px);
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .scroll {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 1;
  }
</style>
