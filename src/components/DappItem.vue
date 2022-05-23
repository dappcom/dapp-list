<template>
  <div class="dapp-item">
    <div class="item-wrap d-flex ai-center">
      <div class="text title1 order">{{ index + 1 }}</div>
      <div class="message title2 d-flex ai-center">
        <img :src="item.icon_url" ref="dappimg" @load="getImg" />
        <div class="dapp">
          <div class="text dapp-name text-ellipsis">
            <!-- {{ item.title }} -->
            <div
              v-if="isEnterTitle"
              v-html="setKeyWord(item.title, item)"
            ></div>
            <span v-else>{{ item.title }}</span>
          </div>
          <div
            class="text dapp-desc text-ellipsis"
            v-if="item.chain_list.length === 1 && item.chain_list[0].chain_id"
          >
            {{ chainNameMap[item.chain_list[0].chain_id] }}
          </div>
          <div
            class="text dapp-desc text-ellipsis"
            v-if="item.chain_list.length === 1 && !item.chain_list[0].chain_id"
          >
            {{ item.chain_list[0].network }}
          </div>
          <div
            class="text dapp-desc text-ellipsis"
            v-if="item.chain_list.length === 2"
          >
            {{ chainNameMap[item.chain_list[0].chain_id] }}
            {{ chainNameMap[item.chain_list[1].chain_id] }}
          </div>
          <div
            class="text dapp-desc text-ellipsis"
            v-if="item.chain_list.length > 2 || item.chain_list.length === 0"
          >
            Multi-Chain
          </div>
        </div>
      </div>
      <a :href="item.url" class="text title3 dapp-url text-ellipsis">
        {{ item.url }}
      </a>
      <div class="copy" @click="onDappCopy(item.url)" v-copy="item.url"></div>
    </div>
    <div :class="{ line: index !== length - 1 }"></div>
  </div>
</template>

<script>
import { chainNameMap } from '../utils'

export default {
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
    length: {
      type: Number,
    },
    enterObj: {
      type: Object,
    },
  },
  computed: {
    chainNameMap() {
      return chainNameMap
    },
    isEnterTitle() {
      if (this.enterObj && this.enterObj.isEnter) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    onDappCopy(url) {
      window._hmt.push(['_copyDappUrlEvent', 'click', url])
    },
    getImg() {
      // console.log('done', this.$refs)
      if (this.$refs.dappimg) {
        this.$refs.dappimg.style.background = 'none'
      }
    },
    setKeyWord(str, obj) {
      // console.log('val', this.enterObj.val)
      let val = this.enterObj.val.trim()
      const reg = new RegExp(val, 'ig')
      let showVal = obj.title.match(reg)
      // console.log('showVal', showVal)
      let showStr = ''
      if (Array.isArray(showVal)) {
        showStr = showVal[0]
      }
      let rerurnStr = str.replace(
        reg,
        `<span style="color: #2761E7;">${showStr}</span>`
      )
      return rerurnStr
    },
  },
}
</script>

<style lang="scss" scoped>
.dapp-item {
  .item-wrap {
    .order {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
    }
    .message {
      img {
        border-radius: 50%;
        width: 44px;
        height: 44px;
        background-image: url('../assets/detail/default.png');
        background-size: contain;
      }
      .dapp {
        margin-left: 14px;
        .dapp-name {
          width: 142px;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
        }
        .dapp-desc {
          width: 142px;
          font-size: 14px;
          color: #999999;
        }
      }
    }
    .dapp-url {
      font-size: 16px;
    }
    .dapp-url:hover {
      color: #2761e7;
    }
    .copy {
      margin-left: 5px;
      width: 15px;
      height: 16px;
      cursor: pointer;
      background: url('../assets/detail/copy-g.png') no-repeat;
      background-size: contain;
    }
    .copy:hover {
      background: url('../assets/detail/copy-b.png') no-repeat;
      background-size: contain;
    }
  }
  .line {
    margin: 24px 0;
    height: 1px;
    background: #d8d8d8;
  }
}
@media screen and (max-width: 767px) {
  .dapp-item {
    .item-wrap {
      padding: 0 16px;
      .order {
        font-size: 12px;
      }
      .message {
        img {
          width: 29px;
          height: 29px;
        }
        .dapp {
          margin-left: 6px;
          .dapp-name {
            width: 65px;
            font-weight: 700;
            font-size: 11px;
          }
          .dapp-desc {
            margin-top: 3px;
            width: 65px;
            font-size: 11px;
          }
        }
      }
      .dapp-url {
        flex: 1;
        font-size: 11px;
      }
      .dapp-url:hover {
        color: #333;
      }
      .copy {
        margin: 0 10px;
      }
      .copy:hover {
        background: url('../assets/detail/copy-g.png') no-repeat;
        background-size: contain;
      }
    }
    .line {
      margin: 24px 0 24px 16px;
      transform: scaleY(0.5);
      height: 1px;
      background: #d8d8d8;
    }
  }
}
</style>
