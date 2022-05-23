<template>
  <div
    class="dapp-collection"
    :class="{ isDetail: isDetail, isEnterTitle: isEnterTitle }"
    @click="goDetail"
  >
    <div class="pc" v-if="!isEnterTitle">
      <img
        class="dapp-img"
        ref="dappimg"
        :src="dappObj.logo_uri"
        @load="getImg"
      />
      <div class="text name" :class="{ isDetail: isDetail }">
        <div
          v-if="isEnterTitle"
          v-html="setKeyWord(dappObj.name, dappObj, true)"
        ></div>
        <span v-else>{{ dappObj.name }}</span>
      </div>
      <div class="text dapp-button" :class="{ isDetail: isDetail }">
        {{ dappObj.dapp_list.length }} DApps
      </div>
      <div
        class="share"
        v-copy="dappObj.url"
        :class="{ isShow: isDetail }"
        @click.stop="onShare"
      ></div>
    </div>
    <div class="pc d-flex ai-center jc-between" v-else>
      <div class="pc-left d-flex ai-center">
        <img
          class="dapp-img"
          :class="{ isEnterTitle: isEnterTitle }"
          ref="dappimg"
          :src="dappObj.logo_uri"
          @load="getImg"
        />
        <div class="message">
          <div class="text d-flex ai-center">
            <div class="text name" :class="{ isEnterTitle: isEnterTitle }">
              <div
                v-if="isEnterTitle"
                v-html="setKeyWord(dappObj.name, dappObj, true)"
              ></div>
            </div>
            <div
              class="share"
              v-copy="dappObj.url"
              :class="{ isShow: isDetail, isEnterTitle: isEnterTitle }"
              @click.stop="onShare"
            ></div>
          </div>
          <div
            v-if="isEnterTitle"
            class="dapps-wrap d-flex flex-column jc-center"
          >
            <div
              class="dapps-item d-flex ai-center"
              v-for="(item, index) in dappObj.searchDapps.slice(0, 2)"
              :key="index"
            >
              <div class="left d-flex ai-center">
                <img :src="item.icon_url" />
                <span
                  class="text-ellipsis"
                  v-html="setKeyWord(item.title, item, false)"
                ></span>
              </div>
              <div
                v-if="
                  item.chain_list.length === 1 && item.chain_list[0].chain_id
                "
                class="right"
              >
                <span>{{ chainNameMap[item.chain_list[0].chain_id] }}</span>
              </div>
              <div
                v-if="
                  item.chain_list.length === 1 && !item.chain_list[0].chain_id
                "
                class="right"
              >
                <span>{{ item.chain_list[0].network }}</span>
              </div>
              <div
                v-if="
                  item.chain_list.length > 1 || item.chain_list.length === 0
                "
                class="right"
              >
                <span>Multi-Chain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pc-right">
        <div
          class="text dapp-button"
          :class="{ isDetail: isDetail, isEnterTitle: isEnterTitle }"
        >
          {{ $t('checkMore') }}
        </div>
      </div>
    </div>
    <div v-if="isEnterTitle" class="mobile">
      <div :class="{ line: isEnterTitle }"></div>
      <div class="dapps-wrap d-flex flex-column jc-center ai-start">
        <div
          class="dapps-item d-flex ai-center jc-between"
          v-for="(item, index) in dappObj.searchDapps.slice(0, 2)"
          :key="index"
        >
          <div class="left d-flex ai-center">
            <img :src="item.icon_url" />
            <span
              class="text-ellipsis"
              v-html="setKeyWord(item.title, item, false)"
            ></span>
          </div>
          <div
            v-if="item.chain_list.length === 1 && item.chain_list[0].chain_id"
            class="right"
          >
            {{ chainNameMap[item.chain_list[0].chain_id] }}
          </div>
          <div
            v-if="item.chain_list.length === 1 && !item.chain_list[0].chain_id"
            class="right"
          >
            {{ item.chain_list[0].network }}
          </div>
          <div
            v-if="item.chain_list.length > 1 || item.chain_list.length === 0"
            class="right"
          >
            Multi-Chain
          </div>
        </div>
      </div>
      <div v-if="dappObj.searchDapps.length > 2" class="more d-flex ai-center">
        <span>{{ $t('checkMore') }}</span>
        <img src="../assets/home/more.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { chainNameMap } from '../utils'
export default {
  props: {
    dappObj: {
      type: Object,
    },
    enterObj: {
      type: Object,
    },
  },
  data() {
    return {
      defaultImg: 'this.src="' + require('../assets/detail/default.png') + '"',
      isMobile: !!navigator.userAgent
        .toLowerCase()
        .match(
          /(ipod|iphone|android|coolpad|tokenpocket|mmp|smartphone|midp|wap|xoom|j2me|blackberry)/i
        ),
    }
  },
  computed: {
    chainNameMap() {
      return chainNameMap
    },
    isDetail() {
      return this.$route.path === '/detail'
    },
    isEnterTitle() {
      if (this.enterObj && this.enterObj.isEnter && !this.enterObj.collection) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    onShare() {
      console.log('share')
    },
    goDetail() {
      if (this.isEnterTitle || this.enterObj.collection) {
        this.$router.push(
          `/detail?id=${this.dappObj.id}&val=${
            this.enterObj.val
          }&collection=${Boolean(this.enterObj.collection)}`
        )
      } else {
        this.$router.push(`/detail?id=${this.dappObj.id}`)
      }
    },
    getImg() {
      // console.log('done', this.$refs)
      if (this.$refs.dappimg) {
        this.$refs.dappimg.style.background = 'none'
      }
    },
    setKeyWord(str, obj, flag) {
      // console.log('val', this.enterObj.val)
      let val = this.enterObj.val.trim()
      const reg = new RegExp(val, 'ig')
      let showVal = flag ? obj.name.match(reg) : obj.title.match(reg)
      // console.log('showVal', showVal)
      let showStr = ''
      if (Array.isArray(showVal)) {
        showStr = showVal[0]
      }
      // console.log('showStr', showStr)
      // return str.replace(reg, `<span style="color: #2761E7;">${showStr}</span>`)
      let rerurnStr = str.replace(
        reg,
        `<span style="color: #2761E7;">${showStr}</span>`
      )

      /*  if (!flag && obj.title.indexOf(this.enterObj.val) >= 5) {
        let index = obj.title.indexOf(this.enterObj.val)
        // console.log('index', index)
        // console.log('rerurnStr', rerurnStr)
        if (this.enterObj.val.length >= 5) {
          index = obj.title.indexOf(this.enterObj.val)
        } else if (this.enterObj.val.length === 4) {
          index = obj.title.indexOf(this.enterObj.val) - 1
        } else {
          index = obj.title.indexOf(this.enterObj.val) - 2
        }

        return '...' + rerurnStr.slice(index)
      } else {
        // console.log('rerurnStr', rerurnStr)
        return rerurnStr
      } */
      return rerurnStr
    },
  },
}
</script>

<style lang="scss" scoped>
.dapp-collection {
  position: relative;
  width: 186px;
  background: #ffffff;
  border: 1px solid #ebf3ff;
  border-radius: 18px;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.05);
  padding: 26px 18px 24px;
  text-align: center;
  &.isDetail {
    background: #2761e7;
    border: none;
    box-shadow: none;
  }
  &.isEnterTitle {
    width: 100%;
  }

  .mobile {
    display: none;
    .more {
      display: none;
    }
  }
  .pc {
    .dapp-img {
      width: 88px;
      height: 88px;
      // 设置img默认显示的图片，避免出现空白
      background-image: url('../assets/detail/default.png');
      background-size: contain;
      &.isEnterTitle {
        width: 68px;
        height: 68px;
      }
    }
    .name {
      margin: 12px 0 10px;
      font-family: PingFangSC, PingFangSC-Medium;
      text-align: center;
      &.isDetail {
        color: #fff;
      }
      &.isEnterTitle {
        margin: 0;
      }
    }
    .dapps-wrap {
      .dapps-item {
        margin-top: 10px;
        .left {
          img {
            width: 18px;
            height: 18px;
            border-radius: 50%;
          }
          span {
            margin-left: 6px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            line-height: 17px;
            white-space: nowrap;
          }
        }
        .right {
          margin-left: 12px;
          height: 14px;
          line-height: 14px;
          border: 1px solid #d7d7d7;
          border-radius: 10px;
          padding: 0 6px;
          opacity: 0.5;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #333333;
          span {
            display: inline-block;
            white-space: nowrap;
            transform: scale(0.75);
          }
        }
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
      &.isEnterTitle {
        margin-top: 0;
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
    .check-more {
      width: 150px;
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
      &.isEnterTitle {
        position: static;
        margin-left: 16px;
      }
    }
    .share:hover {
      background: url('../assets/home/share-hover.png') no-repeat;
      background-size: contain;
    }
    .pc-left {
      .message {
        margin-left: 30px;
      }
    }
  }
}

@media screen and(max-width:767px) {
  .dapp-collection {
    width: 100%;
    background: #ffffff;
    border: 1px solid #ebf3ff;
    border-radius: 15px;
    padding: 9px 0;
    .pc {
      padding-left: 10px;
      display: flex;
      align-items: center;
      .dapp-img {
        width: 36px;
        height: 36px;
        &.isEnterTitle {
          width: 36px;
          height: 36px;
        }
      }
      .pc-left {
        .message {
          margin-left: 10px;
        }
      }
      .dapps-wrap {
        display: none;
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
        &.isEnterTitle {
          display: none;
        }
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
        top: 21px;
      }
      .share:hover {
        background: url('../assets/home/share.png') no-repeat;
        background-size: contain;
      }
    }
    .mobile {
      position: relative;
      display: block;
      .line {
        display: block;
        margin: 10px 0;
        height: 1px;
        background: #d7d7d7;
        transform: scaleY(0.5);
      }
      .dapps-wrap {
        margin-left: 10px;
        .dapps-item {
          .left {
            img {
              width: 29px;
              height: 29px;
              border-radius: 50%;
            }
            span {
              margin: 0 15px 0 10px;
              font-size: 13px;
              font-family: PingFangSC, PingFangSC-Medium;
              font-weight: 500;
              color: #333333;
            }
          }
          .right {
            position: relative;
            height: 16px;
            line-height: 16px;
            border: none;
            border-radius: 16px;
            font-size: 9px;
            transform: scale(1);
            padding: 0 11px;
          }
          .right:after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            border: 1px solid #d7d7d7;
            transform: scale(0.5);
            border-radius: 32px;
          }
          &:nth-child(2) {
            margin-top: 10px;
          }
        }
      }
      .more {
        position: absolute;
        display: flex;
        right: 10px;
        bottom: 9px;
        span {
          font-size: 11px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #999999;
        }
        img {
          margin-left: 4px;
          width: 8px;
          height: 8px;
        }
      }
    }
  }
}
</style>
