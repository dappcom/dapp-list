<template>
  <div class="home">
    <Header @openMenu="onMenu" />
    <div class="main d-flex">
      <!-- <div class="left-content d-flex flex-column ai-center jc-center"> -->
      <div class="left-content d-flex flex-column ai-center">
        <div class="title-wrap">
          <span class="text">{{ $t('dappList') }}</span>
        </div>
        <div class="text dappDesc">{{ $t('dappDesc1') }}</div>
        <div class="text dappDesc">{{ $t('dappDesc2') }}</div>
        <div class="text dappDesc">{{ $t('dappDesc3') }}</div>
        <a
          href="https://github.com/dappcom/dapp-list/tree/main/dapps"
          class="text create-btn"
        >
          {{ $t('createBtn') }}
        </a>
        <a
          v-if="$i18n.locale === 'zh'"
          href="https://github.com/TP-Lab/TIPs/blob/main/TIPs/tip-001.md"
          class="text read-me"
          >{{ $t('readMe') }}</a
        >
        <a
          v-else
          href="https://github.com/TP-Lab/TIPs/blob/main/TIPs/tip-001.zh_CN.md"
          class="text read-me"
          >{{ $t('readMe') }}</a
        >
        <div class="footer-wrap d-flex ai-center jc-between">
          <div
            class="button-item d-flex ai-center"
            v-for="(item, bIndex) in buttonList"
            :key="item.title"
            @click="onClick(bIndex)"
          >
            <img :src="item.icon" />
            <span class="text">{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="right-content flex-1">
        <div class="seaech-sticky" ref="seaechSticky">
          <SearchWrap
            @getHomeVal="getVal"
            @reset="onReset"
            @oninput="onInput"
            @focus="onFocus"
            :searchVal="searchVal"
          />
          <div class="searchDropDown" ref="searchDropDown">
            <SearchDropDown
              v-show="(isFocus && historyList.length) || (searchVal && isEnd)"
              :searchVal="searchVal"
              :isFocus="isFocus"
              :historyList="historyList"
              @getData="getData"
              @getHomeVal="getVal"
              @checkAllDappList="getCheckAllDappList"
              :height="height + 'px'"
            />
          </div>
        </div>
        <div
          class="dapp-collection-wrap d-flex jc-between flex-wrap"
          v-if="dappCollection.length"
        >
          <DappCollection
            v-for="(item, index) in dappCollection"
            :key="index"
            :dappObj="item"
            :enterObj="enterObj"
          />
          <div style="width: 186px; height: 0"></div>
        </div>
        <NoMatch v-else />
      </div>
    </div>
    <Modal v-if="isModal" @closeModal="onClose" />
    <MenuMobile
      v-if="isMenuMobile"
      @showMenuMobile="onClick"
      @close="closeMenuMobile"
      :menuTop="menuTop"
    />
  </div>
</template>

<script>
import DappCollection from '../components/DappCollection.vue'
import Header from '../components/Header.vue'
import MenuMobile from '../components/MenuMobile.vue'
import Modal from '../components/Modal.vue'
import NoMatch from '../components/NoMatch.vue'
import SearchDropDown from '../components/SearchDropDown.vue'
import SearchWrap from '../components/SearchWrap.vue'

import dappCollection from '../dapplist'
import { FuzzySearch, FuzzySearchDappList } from '../utils'

export default {
  name: 'Home',
  components: {
    Header,
    DappCollection,
    SearchWrap,
    Modal,
    MenuMobile,
    NoMatch,
    SearchDropDown,
  },
  data() {
    return {
      isModal: false,
      isMenuMobile: false,
      isFocus: false,
      isEnd: true,
      enterObj: {},
      historyList: [],
      dappCollection: [],
      searchVal: '',
      height: 0,
      menuTop: 0,
    }
  },
  computed: {
    buttonList() {
      return [
        {
          icon: require('../assets/home/github-hover.png'),
          title: this.$t('githubCode'),
        },
        {
          icon: require('../assets/home/download.png'),
          title: this.$t('tpDownload'),
        },
      ]
    },
  },
  created() {
    console.log('dapplist1', dappCollection)
    this.dappCollection = dappCollection
    document.body.style.overflow = 'auto'

    // console.log('---', JSON.parse(window.localStorage.getItem('enterObj')))
    let enterObj = JSON.parse(window.localStorage.getItem('enterObj'))
    if (enterObj) {
      this.getVal(enterObj)
      this.searchVal = enterObj.val
      if (this.enterObj.collection) {
        this.dappCollection = FuzzySearchDappList(
          dappCollection,
          this.searchVal
        )
      }
      window.localStorage.removeItem('enterObj')
    }
    this.historyList =
      JSON.parse(window.localStorage.getItem('historyList')) || []
    if (this.historyList.length > 10) {
      this.historyList = this.historyList.slice(0, 10)
      window.localStorage.setItem(
        'historyList',
        JSON.stringify(this.historyList)
      )
    }
  },
  mounted() {
    document.addEventListener('click', this.onOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onOutside)
  },

  methods: {
    getData(item) {
      this.dappCollection = this.dappCollection.filter((d) => {
        return d.name === item.name
      })
      this.searchVal = item.name
      this.isEnd = false
      this.isFocus = false
    },
    onSearchDropDown() {
      this.isFocus = true
      console.log('onSearchDropDown', this.isFocus)
    },
    getSearchDropDownTop() {
      const searchDropDown = this.$refs.searchDropDown
      // console.log('height', searchDropDown.getBoundingClientRect().top)
      this.height = searchDropDown.getBoundingClientRect().top
    },
    onOutside(e) {
      const searchDropDown = this.$refs.searchDropDown
      const seaechSticky = this.$refs.seaechSticky
      if (
        searchDropDown &&
        seaechSticky &&
        !searchDropDown.contains(e.target) &&
        !seaechSticky.contains(e.target)
      ) {
        const contentWrap = document.querySelector('.search-drop-down')
        const contentWrap2 = document.querySelector('.seaech-sticky')
        if (
          contentWrap &&
          contentWrap2 &&
          !contentWrap.contains(e.target) &&
          !contentWrap2.contains(e.target)
        ) {
          // console.log(111)
          this.isFocus = false
        }
      }
      // this.isFocus = false
      // console.log('onOutside', this.isFocus)
    },
    onInput(val) {
      // console.log('val', val)
      this.searchVal = val
      this.isEnd = true
    },
    onFocus(flag) {
      // console.log('flag', this.$refs)
      // this.$refs.homeChild.getSearch()
      this.isFocus = flag
      this.historyList =
        JSON.parse(window.localStorage.getItem('historyList')) || []
      // this.getSearchDropDownTop()
    },
    onClick(index) {
      if (index === 0) {
        window.open('https://github.com/dappcom/dapp-list')
      } else {
        this.isModal = true
        this.isMenuMobile = false
        document.body.style.overflow = 'auto'
      }
    },
    onClose() {
      console.log(111)
      this.isModal = false
    },
    closeMenuMobile() {
      this.isMenuMobile = false
      document.body.style.overflow = 'auto'
    },
    getVal(data) {
      // console.log('home-val', val)
      this.dappCollection = FuzzySearch(dappCollection, data.val)
      if (data.checkAllDapps) {
        this.dappCollection = this.dappCollection.filter((d) => {
          return d.searchDapps.length > 0
        })
      }
      this.isEnd = false
      this.isFocus = false
      this.searchVal = data.val
      this.enterObj = data
      console.log('resdapp', this.dappCollection)
    },

    getCheckAllDappList(data) {
      this.dappCollection = data.dappList
      this.isEnd = false
      this.isFocus = false
      this.enterObj = data.enterObj
    },
    onReset() {
      this.enterObj = { isEnter: false, val: '' }
      this.dappCollection = dappCollection
      this.isEnd = true
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
  },
}
</script>
<style lang="scss" scoped>
.home {
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */

  .main {
    width: 1200px;
    margin: 0 auto;
    .left-content {
      position: sticky;
      top: 95px;
      width: 573px;
      height: calc(100vh - 95px);
      background: #2761e7;
      border-radius: 44px 44px 0px 0px;
      .title-wrap {
        margin: 50px 0 31px;
        // margin-bottom: 31px;
        width: 482px;
        span {
          margin-left: 33px;
          font-size: 36px;
          font-weight: 700;
          color: #ffffff;
        }
      }
      .dappDesc {
        width: 419px;
        color: #ffffff;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        line-height: 30px;
      }
      .dappDesc:nth-child(3) {
        margin: 20px 0;
      }
      .create-btn {
        margin: 40px 0 20px 0;
        width: 419px;
        height: 67px;
        border: 1px solid #ffffff;
        border-radius: 16px;
        line-height: 67px;
        text-align: center;
        font-size: 20px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #ffffff;
        cursor: pointer;
      }
      .create-btn:hover {
        background: #fff;
        color: #2761e7;
      }
      .read-me {
        margin-bottom: 15px;
        color: #fff;
        font-size: 14px;
      }
      .footer-wrap {
        width: 419px;
        .button-item {
          cursor: pointer;
          // margin-left: 123px;
          &:nth-child(2) {
            margin-top: 0px;
          }
          img {
            width: 16px;
            height: 16px;
          }
          span {
            margin-left: 11px;
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Regular;
            color: #ffffff;
          }
        }
      }
    }
    .right-content {
      .seaech-sticky {
        position: sticky;
        width: 100%;
        top: 95px;
        z-index: 998;
        background: #f5f9ff;
        padding: 20px 0 31px 31px;
        box-shadow: 8px 0px 10px 5px #f5f9ff;
      }
      .dapp-collection-wrap {
        margin: 10px 0 0 31px;
        .dapp-collection:nth-child(n + 1) {
          margin-bottom: 20px;
        }
      }
      .search-null {
        margin: 186px 0 0 31px;
        text-align: center;
        img {
          width: 98px;
          height: 94px;
        }
        .match {
          text-align: center;
          color: #999999;
        }
      }
    }
  }
}

@media screen and(max-width:767px) {
  .home {
    .main {
      width: 100%;
      display: block;
      .left-content {
        position: static;
        width: 100%;
        height: auto;
        padding: 0 16px 48px 16px;
        border-radius: 0;
        .title-wrap {
          width: 100%;
          background: none;
          margin: 15px 0 10px 0;
          span {
            margin-left: 0;
            font-size: 33px;
          }
        }
        .dappDesc {
          width: 100%;
          font-size: 13px;
          line-height: 20px;
          font-family: PingFangSC, PingFangSC-Medium;
        }
        .create-btn {
          margin: 30px 0 0 0;
          width: 100%;
          height: 49px;
          line-height: 49px;
          border-radius: 10px;
          font-size: 13px;
          background: #fff;
          color: #2761e7;
        }
        .read-me {
          margin: 10px 0 0;
        }
        .footer-wrap {
          width: 100%;
          height: auto;
          background: none;
          border-radius: 0;
          display: block;
          .button-item {
            position: relative;
            margin-top: 15px;
            cursor: pointer;
            margin-left: 0;
            height: 34px;
            border-radius: 10px;
            justify-content: center;
            &:nth-child(2) {
              margin-top: 20px;
            }
            img {
              width: 12px;
              height: 12px;
            }
            span {
              margin-left: 11px;
              font-size: 13px;
              font-family: PingFangSC, PingFangSC-Regular;
              color: #ffffff;
            }
          }
          .button-item:after {
            content: '';
            position: absolute;
            z-index: 0;
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            border: 1px solid #ffffff;
            transform: scale(0.5);
            border-radius: 20px;
          }
        }
      }
      .right-content {
        margin-left: 0;
        padding: 0 16px;
        .seaech-sticky {
          position: static;
          position: relative;
          top: auto;
          z-index: 9996;
          background: #f5f9ff;
          padding: 25px 0 20px;
          box-shadow: none;
        }
        .dapp-collection-wrap {
          margin: 0;
          height: auto;
          .dapp-collection:nth-child(n + 1) {
            margin-bottom: 15px;
          }
        }
        .search-null {
          margin: 100px 0 50px;
          text-align: center;
          img {
            width: 49px;
            height: 47px;
          }
          .match {
            text-align: center;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
