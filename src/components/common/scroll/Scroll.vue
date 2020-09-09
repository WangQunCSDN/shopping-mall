<template>
  <!--ref/children-->
  <div ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  import ObserveDOM from '@better-scroll/observe-dom'

  BScroll.use(Pullup);
  BScroll.use(ObserveDOM);

  export default {
    name: "Scroll",
    data(){
      return {
        bscroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted(){
      // 1.创建BScroll对象
      this.bscroll = new BScroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad,
        observeDOM: true
      });

      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.bscroll.on('scroll', (position) => {
          this.$emit('getScrollPosition', position);
        });
      }

      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.bscroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        })
      }
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.bscroll && this.bscroll.scrollTo(x, y, time);
      },
      refresh(){
        this.bscroll && this.bscroll.refresh();
      },
      finishPullUp(){
        this.bscroll && this.bscroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>

</style>
