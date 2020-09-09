import {debounce} from "./utils";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted(){
    // img标签确实被挂载，但是其中的图片还没有占据高度
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      this.newRefresh();
    };
    this.$EventBus.$on('itemImageLoad', this.itemImgListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};
