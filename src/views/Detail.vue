<template>
  <div class="detail">
    <Header @openMenu="onMenu" />
    <div class="main d-flex">
      <div class="detail-left">
        <div class="dapp-collection-wrap d-flex jc-center">
          <DappCollection :dappObj="dappObj" />
        </div>
        <div class="detail-item" v-for="item in leftList" :key="item.title">
          <div class="text title">{{ item.title }}</div>
          <div class="link-wrap d-flex ai-center">
            <div class="link text-ellipsis" :class="{ active: !item.desc }">
              {{ item.url }}
            </div>
            <img
              v-if="item.desc"
              src="../assets/detail/copy-w.png"
              v-copy="item.url"
            />
          </div>
          <div class="text desc">
            {{ item.desc }}
          </div>
        </div>
        <div class="addbtn" @click="addDappList" v-copy="dappObj.url">
          {{ $t('addWallet') }}
        </div>
        <div class="text course" @click="goCourse">{{ $t('course') }}</div>
      </div>
      <div class="detail-left-mini">
        <div class="detail-header d-flex ai-center jc-between">
          <div class="dapp-detail d-flex ai-center">
            <img :src="dappObj.logo_uri" />
            <div class="message">
              <div class="text name">{{ dappObj.name }}</div>
              <div class="text desc">{{ dappList.length }} DApps</div>
            </div>
          </div>
          <div class="addbtn" v-copy="dappObj.url">{{ $t('addWallet') }}</div>
        </div>
        <div class="blue-line"></div>
        <div class="link d-flex ai-center">
          <div class="link-title">{{ $t('link') }}</div>
          <div class="text link-url text-ellipsis" style="width: 200px">
            {{ dappObj.url }}
          </div>
          <img src="../assets/detail/copy-w.png" v-copy="leftList[0].url" />
        </div>
        <div class="text link-desc">
          {{ $t('linkDesc') }}
        </div>
        <div>
          <span class="text link-title">{{ $t('lastUpdate') }}</span>
          <span class="text link-url">{{ dappObj.timestamp }}</span>
        </div>
        <div style="margin-top: 8px">
          <span class="text link-title">{{ $t('version') }}</span>
          <span class="text link-url">{{ dappObj.version }}</span>
        </div>
      </div>
      <div class="detail-right flex-1">
        <div class="header">
          <div class="d-flex ai-center jc-between">
            <div class="text header-title">{{ $t('dappList') }}</div>
            <SearchWrap @getDetailVal="getVal" @reset="onReset" />
          </div>
          <div class="header-list d-flex">
            <span class="text title title1"> {{ $t('order') }} </span>
            <span class="text title title2"> {{ $t('name') }} </span>
            <span class="text title title3"> {{ $t('link') }} </span>
          </div>
        </div>
        <div class="list-content" v-if="dappList.length">
          <div class="dapp-item" v-for="(item, index) in dappList" :key="index">
            <div class="item-wrap d-flex ai-center">
              <div class="text title1 order">{{ index + 1 }}</div>
              <div class="message title2 d-flex ai-center">
                <img :src="item.icon_url" ref="dappimg" @load="getImg(index)" />
                <div class="dapp">
                  <div class="text dapp-name text-ellipsis">
                    {{ item.title }}
                  </div>
                  <div
                    class="text dapp-desc text-ellipsis"
                    v-if="
                      item.chain_list.length === 1 &&
                      item.chain_list[0].chain_id
                    "
                  >
                    {{ chainNameMap[item.chain_list[0].chain_id] }}
                  </div>
                  <div
                    class="text dapp-desc text-ellipsis"
                    v-if="
                      item.chain_list.length === 1 &&
                      !item.chain_list[0].chain_id
                    "
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
                  <!-- <div
                    class="text dapp-desc text-ellipsis"
                    v-if="
                      item.chain_list.length === 2 &&
                      item.chain_list[0].network === item.chain_list[1].network
                    "
                  >
                    {{ item.chain_list[0].network }}
                  </div> -->
                  <div
                    class="text dapp-desc text-ellipsis"
                    v-if="
                      item.chain_list.length > 2 || item.chain_list.length === 0
                    "
                  >
                    <!-- {{ item.chain_list[0].network }} -->
                    Multi-Chain
                  </div>
                </div>
              </div>
              <a :href="item.url" class="text title3 dapp-url text-ellipsis">
                {{ item.url }}
              </a>
              <div class="copy" v-copy="item.url"></div>
            </div>
            <div :class="{ line: index !== dappList.length - 1 }"></div>
          </div>
        </div>
        <NoMatch v-else />
      </div>
    </div>
    <MenuMobile v-if="isMenuMobile" :menuTop="menuTop" />
  </div>
</template>

<script>
import tp from 'tp-js-sdk'
import { chainNameMap, courseUrl, courseEnUrl } from '../utils'
import Header from '../components/Header.vue'
import DappCollection from '../components/DappCollection.vue'
import SearchWrap from '../components/SearchWrap.vue'
import MenuMobile from '../components/MenuMobile.vue'
import NoMatch from '../components/NoMatch.vue'

import dappCollection from '../dapplist'
import { FuzzySearch } from '../utils'

export default {
  components: { Header, DappCollection, SearchWrap, MenuMobile, NoMatch },
  data() {
    return {
      dappList: [],
      isMenuMobile: false,
      id: 0,
      dappObj: {},
      menuTop: 0,
    }
  },
  computed: {
    leftList() {
      return [
        {
          title: this.$t('link'),
          url: this.dappObj.url,
          desc: this.$t('linkDesc'),
        },
        {
          title: this.$t('lastUpdate'),
          url: this.dappObj.timestamp,
        },
        {
          title: this.$t('version'),
          url: this.dappObj.version,
        },
      ]
    },
    chainNameMap() {
      return chainNameMap
    },
  },

  created() {
    // console.log('this.$route', this.$route)
    this.id = this.$route.query.id
    this.dappObj = dappCollection[this.$route.query.id]
    this.dappList = this.dappObj.dapp_list
    document.body.style.overflow = 'auto'
  },
  methods: {
    getImg(index) {
      // console.log('done', this.$refs)
      if (this.$refs.dappimg[index]) {
        this.$refs.dappimg[index].style.background = 'none'
      }
    },
    goCourse() {
      if (this.$i18n.locale === 'en') {
        window.open(courseUrl)
      } else {
        window.open(courseEnUrl)
      }
    },
    getVal(val) {
      console.log('detail-val', val)
      this.dappList = FuzzySearch(this.dappList, val)
    },
    onReset() {
      this.dappList = this.dappObj.dapp_list
    },
    onMenu(top) {
      this.menuTop = top
      this.isMenuMobile = !this.isMenuMobile
      if (this.isMenuMobile) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
    addDappList() {
      if (navigator.userAgent.indexOf('TokenPocket') != -1) {
        // console.log(tp.add)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  .main {
    width: 1200px;
    margin: 0 auto;
    .detail-left {
      position: sticky;
      top: 95px;
      width: 338px;
      height: calc(100vh - 95px);
      background: #2761e7;
      border: 1px solid #ebf3ff;
      border-radius: 18px 18px 0px 0px;
      .dapp-collection-wrap {
        margin-top: 0px;
      }
      .detail-item {
        margin-left: 32px;
        .title {
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #ffffff;
        }
        .link-wrap {
          margin: 10px 0;
          .link {
            padding: 0 18px;
            width: 249px;
            height: 30px;
            background: #1f59df;
            border-radius: 8px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            color: #ffffff;
            line-height: 30px;
            text-align: center;
            &.active {
              width: auto;
            }
          }
          img {
            margin-left: 12px;
            width: 15px;
            height: 16px;
            cursor: pointer;
          }
        }
        .desc {
          width: 274px;
          font-size: 12px;
          color: #ffffff;
        }
      }
      .detail-item:nth-child(2) {
        margin-top: 0px;
      }
      .detail-item:nth-child(3) {
        margin-top: 24px;
      }
      .detail-item:nth-child(4) {
        margin-top: 24px;
      }
      .addbtn {
        width: 274px;
        margin: 0 auto;
        margin-top: 30px;
        height: 50px;
        border: 1px solid #ffffff;
        border-radius: 16px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        line-height: 50px;
        cursor: pointer;
      }
      .course {
        margin-top: 20px;
        color: #fff;
        font-family: PingFangSC, PingFangSC-Medium;
        text-align: center;
        cursor: pointer;
      }
    }
    .detail-left-mini {
      display: none;
    }
    .detail-right {
      margin: 0 0 30px 56px;

      .title1 {
        text-align: center;
        width: 50px;
      }
      .title2 {
        margin-left: 70px;
        width: 200px;
      }
      .title3 {
        margin-left: 30px;
        width: 350px;
      }

      .header {
        padding: 10px 0 24px;
        position: sticky;
        width: 100%;
        top: 95px;
        z-index: 998;
        background: #f5f9ff;
        .header-title {
          font-size: 36px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 700;
        }
        .header-list {
          margin-top: 39px;
        }
      }

      .list-content {
        .dapp-item {
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
          .line {
            margin: 24px 0;
            height: 1px;
            background: #d8d8d8;
          }
        }
      }
    }
  }
}
@media screen and(max-width:767px) {
  .detail {
    width: 100%;
    .main {
      display: block;
      width: 100%;
      .detail-left {
        display: none;
      }
      .detail-left-mini {
        display: block;
        background: #2761e7;
        padding: 12px 16px 20px 16px;
        span {
          display: inline-block;
        }
        .detail-header {
          .dapp-detail {
            img {
              width: 44px;
              height: 44px;
              background-image: url('../assets/detail/default.png');
              background-size: contain;
            }
            .message {
              margin-left: 10px;
              .name {
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Medium;
                font-weight: 500;
                text-align: center;
                color: #ffffff;
              }
              .desc {
                width: 70px;
                margin-top: 5px;
                padding: 0 8px;
                height: 18px;
                background: #245ce0;
                border-radius: 18px;
                font-size: 10px;
                font-family: PingFangSC, PingFangSC-Regular;
                text-align: center;
                color: #ffffff;
                line-height: 18px;
              }
            }
          }
          .addbtn {
            position: relative;
            width: 137px;
            height: 34px;
            // border: 1px solid #ffffff;
            border-radius: 11px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: center;
            color: #ffffff;
            line-height: 34px;
          }
          .addbtn:after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            border: 1px solid #fff;
            transform: scale(0.5);
            border-radius: 22px;
          }
        }
        .blue-line {
          height: 3px;
          margin: 12px auto;
          background: #245ce0;
        }
        .link-desc {
          opacity: 0.5;
          font-size: 10px;
          color: #ffffff;
          margin: 10px 0 17px 0;
        }
        .link-title {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #ffffff;
        }
        .link-url {
          height: 22px;
          background: #245ce0;
          border-radius: 5px;
          padding: 0 9px;
          margin: 0 8px 0 10px;
          font-size: 12px;
          color: #ffffff;
          line-height: 22px;
        }
        .link {
          img {
            width: 15px;
            height: 16px;
          }
        }
      }
      .detail-right {
        width: 100%;
        margin-left: 0;
        .title {
          font-size: 14px;
          font-weight: 700;
        }
        .title1 {
          width: 40px;
        }
        .title2 {
          margin-left: 16px;
          width: 100px;
        }
        .title3 {
          margin-left: 10px;
          width: 120px;
        }
        .header {
          position: static;
          margin: 0;
          padding: 20px 16px 24px;
          .header-title {
            font-size: 16px;
            white-space: nowrap;
          }
          .header-list {
            margin-top: 20px;
          }
        }
        .list-content {
          .dapp-item {
            .item-wrap {
              padding: 0 16px;
            }
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
            .line {
              margin-left: 16px;
              transform: scaleY(0.5);
            }
          }
        }
      }
    }
  }
}
</style>
