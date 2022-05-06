<template>
  <div class="header d-flex jc-between ai-center">
    <img src="../assets/home/logo.png" class="logo" @click="goHome" />
    <div class="right d-flex jc-between ai-center">
      <div class="download-content" v-if="!isDetail">
        <span class="text download">{{ $t('download') }}</span>
        <div class="download-popup">
          <svg class="svg" width="40" height="40" viewBox="-50 -50 300 300">
            <polygon
              class="triangle"
              stroke-linejoin="round"
              points="100,80 0,200 200,200"
            />
          </svg>
          <a
            class="product-item"
            v-for="(item, index) in downloadList"
            :key="index"
            :href="item.url"
          >
            <div class="item-content d-flex ai-center">
              <div class="icon-wrap d-flex ai-center jc-center">
                <img :src="item.icon" />
              </div>
              <div class="introduce">
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="title desc">
                  {{ item.desc }}
                </div>
              </div>
            </div>
            <div :class="{ line: index === 0 }"></div>
          </a>
        </div>
      </div>
      <div class="text language" style="margin-left: 40px" @click="goCourse">
        {{ $t('course') }}
      </div>
      <a
        href="https://github.com/dappcom/dapp-list"
        target="_blank"
        class="github d-flex jc-center ai-center"
        :class="{ isDetail: isDetail }"
      >
        <div class="github-img"></div>
        <span class="text">Github</span>
      </a>
      <div class="text language" v-if="!isDetail" @click="changeLang">
        {{ $t('language') }}
      </div>
    </div>
    <img src="../assets/home/menu.png" class="menu" @click="onMenu" />
  </div>
</template>

<script>
import { courseUrl, courseEnUrl } from '../utils'

export default {
  computed: {
    isDetail() {
      return this.$route.path === '/detail'
    },
    downloadList() {
      return [
        {
          icon: require('../assets/home/app.png'),
          title: this.$t('tpApp'),
          desc: this.$t('tpAppDesc'),
          url: 'https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii?hl=zh-CN',
        },
        {
          icon: require('../assets/home/extension.png'),
          title: this.$t('tpExtension'),
          desc: this.$t('tpExtensionDesc'),
          url: 'https://tokenpocket.pro/zh/download/app',
        },
      ]
    },
  },
  methods: {
    goCourse() {
      if (this.$i18n.locale === 'en') {
        window.open(courseEnUrl)
      } else {
        window.open(courseUrl)
      }
    },
    onMenu() {
      this.$emit('openMenu')
    },
    goHome() {
      if (this.isDetail) {
        this.$router.push('/')
      } else {
        let jon = '{"name":"abc","age":18}'
        const res = this.parseData(jon)
        // console.log(res)
      }
    },
    parseData(data) {
      try {
        return JSON.parse(data)
      } catch (e) {
        console.log(e)
      }
    },
    changeLang() {
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'zh'
      } else {
        this.$i18n.locale = 'en'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 1250px;
  margin: 0 auto;
  padding: 0 25px;
  position: sticky;
  top: 0;
  height: 95px;
  z-index: 999;
  background: #f5f9ff;
  .logo {
    width: 156px;
    height: 36px;
    cursor: pointer;
  }
  .right {
    .download-content {
      position: relative;
      .download {
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        cursor: pointer;
      }
      .download-popup {
        display: none;
        position: absolute;
        z-index: 1000;
        top: 40px;
        left: -65px;
        width: 328px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.1);
        padding: 26px 24px 28px 24px;
        .svg {
          position: absolute;
          z-index: 0;
          top: -22px;
          left: 80px;
        }
        .triangle {
          fill: #fff;
          stroke: #fff;
          stroke-width: 150;
        }
        .product-item {
          cursor: pointer;
          .item-content {
            .icon-wrap {
              width: 50px;
              height: 50px;
              background: #f5f9ff;
              border-radius: 50%;
              img {
                width: 36px;
                height: 36px;
              }
            }
            .introduce {
              margin-left: 8px;
              .title {
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Medium;
                color: #333;
              }
              .desc {
                opacity: 0.5;
                font-size: 12px;
                font-family: PingFangSC, PingFangSC-Regular;
              }
            }
          }
          .line {
            width: 100%;
            height: 1px;
            background: #eaeaea;
            margin: 11px 0;
          }
        }
        .product-item:hover {
          .introduce {
            .title {
              color: #2761e7;
            }
          }
        }
      }
    }
    .download-content:hover {
      .download {
        color: #2761e7;
      }
      .download-popup {
        display: block;
      }
    }
    .github {
      width: 108px;
      height: 32px;
      border: 1px solid #d7d7d7;
      border-radius: 17px;
      margin: 0 40px;
      cursor: pointer;
      &.isDetail {
        margin: 0 0 0 40px;
      }

      .github-img {
        width: 16px;
        height: 16px;
        background: url('../assets/home/github.png') no-repeat;
        background-size: contain;
        margin-right: 7px;
      }
      span {
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
      }
    }
    .github:hover {
      .github-img {
        background: url('../assets/home/github-hover.png') no-repeat;
        background-size: contain;
      }
      background: #2761e7;
      span {
        color: #fff;
      }
    }
    .language {
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .menu {
    display: none;
  }
}
@media screen and(max-width:767px) {
  .header {
    position: static;
    width: 100%;
    height: auto;
    padding: 30px 22px 30px 16px;
    align-items: flex-start;
    .logo {
      width: 104px;
      height: 24px;
    }
    .right {
      display: none;
    }
    .menu {
      display: block;
      width: 22px;
      height: 22px;
    }
  }
}
</style>
