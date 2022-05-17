<template>
  <div
    class="dapp-collection"
    :class="{ isDetail: isDetail }"
    @click="goDetail"
  >
    <img
      class="dapp-img"
      ref="dappimg"
      :src="dappObj.logo_uri"
      @load="getImg"
    />
    <div class="text name" :class="{ isDetail: isDetail }">
      {{ dappObj.name }}
    </div>
    <div class="text dapp-button" :class="{ isDetail: isDetail }">
      {{ dappObj.dapp_list.length }} DApps
    </div>
    <div
      class="share"
      v-copy="dappObj.url"
      :class="{ isShow: isDetail }"
      @click.stop="
        {
        }
      "
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    dappObj: {
      type: Object,
    },
  },
  data() {
    return {
      defaultImg: 'this.src="' + require('../assets/detail/default.png') + '"',
    }
  },
  computed: {
    isDetail() {
      return this.$route.path === '/detail'
    },
  },
  methods: {
    goDetail() {
      this.$router.push(`/detail?id=${this.dappObj.id}`)
      window._hmt.push(['_collectionEvent', 'click', this.dappObj.name])
    },
    getImg() {
      // console.log('done', this.$refs)
      if (this.$refs.dappimg) {
        this.$refs.dappimg.style.background = 'none'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dapp-collection {
  position: relative;
  width: 186px;
  height: 216px;
  background: #ffffff;
  border: 1px solid #ebf3ff;
  border-radius: 18px;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.05);
  padding: 26px 0 24px 0;
  text-align: center;
  &.isDetail {
    background: #2761e7;
    border: none;
    box-shadow: none;
  }
  .dapp-img {
    width: 88px;
    height: 88px;
    // 设置img默认显示的图片，避免出现空白
    background-image: url('../assets/detail/default.png');
    background-size: contain;
  }
  .name {
    margin: 12px 0 10px;
    font-family: PingFangSC, PingFangSC-Medium;
    text-align: center;
    &.isDetail {
      color: #fff;
    }
  }
  .dapp-button {
    width: 118px;
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    border: 1px solid #d7d7d7;
    border-radius: 16px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    cursor: pointer;
    &.isDetail {
      background: #245ce0;
      border: none;
      color: #fff;
    }
  }
  .dapp-button:hover {
    background: #2761e7;
    border: 1px solid #2761e7;
    color: #fff;
    &.isDetail {
      background: #245ce0;
      border: none;
    }
  }
  .share {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 16px;
    height: 16px;
    background: url('../assets/home/share.png') no-repeat;
    background-size: contain;
    cursor: pointer;
    &.isShow {
      display: none;
    }
  }
  .share:hover {
    background: url('../assets/home/share-hover.png') no-repeat;
    background-size: contain;
  }
}

@media screen and(max-width:767px) {
  .dapp-collection {
    display: flex;
    align-items: center;
    width: 100%;
    height: 54px;
    background: #ffffff;
    border: 1px solid #ebf3ff;
    border-radius: 15px;
    .dapp-img {
      width: 36px;
      height: 36px;
      margin-left: 10px;
    }
    .name {
      margin-left: 10px;
      font-size: 14px;
    }
    .dapp-button {
      position: relative;
      width: auto;
      height: 20px;
      line-height: 20px;
      margin: 0;
      padding: 0 9px;
      margin-left: 10px;
      font-size: 9px;
      border: none;
    }
    .dapp-button:after {
      content: '';
      position: absolute;
      z-index: 0;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 1px solid #d7d7d7;
      transform: scale(0.5);
      border-radius: 32px;
    }
    .dapp-button:hover {
      background: #fff;
      border: 1px solid #d7d7d7;
      color: #333;
    }
    .share {
      width: 12px;
      height: 12px;
      top: 50%;
      transform: translateY(-50%);
    }
    .share:hover {
      background: url('../assets/home/share.png') no-repeat;
      background-size: contain;
    }
  }
}
</style>
