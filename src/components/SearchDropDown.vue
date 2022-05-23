<template>
  <div class="search-drop-down">
    <div class="search-history" v-if="searchVal === ''">
      <div class="text title">
        {{ $t('searchHistory') }}
      </div>
      <div class="history-wrap d-flex flex-wrap">
        <span
          class="text secondary-title history-item"
          v-for="item in historyList.slice(0, 10)"
          :key="item"
          @click.stop="onHistory(item)"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <div class="possible" v-else>
      <div class="text title">{{ searchTitle }}</div>
      <div class="dapps" v-if="dapps.length">
        <div class="top d-flex jc-between">
          <div class="text secondary-title" @click="getDapps">DApps</div>
          <div
            class="text check"
            v-if="dapps.length > 3"
            @click="onCheckAllDapps(searchVal)"
          >
            {{ $t('checkAll') }}
          </div>
        </div>
        <div class="d-flex flex-wrap jc-between">
          <div
            class="dapp-item d-flex ai-center"
            v-for="(dapp, index) in dapps.slice(0, 3)"
            :key="index"
            @click="onDapp(dapp.title)"
          >
            <img :src="dapp.icon_url" />
            <div class="text name text-ellipsis">{{ dapp.title }}</div>
            <div
              class="chain"
              v-if="dapp.chain_list.length === 1 && dapp.chain_list[0].chain_id"
            >
              {{ chainNameMap[dapp.chain_list[0].chain_id] }}
            </div>
            <div
              class="chain"
              v-if="
                dapp.chain_list.length === 1 && !dapp.chain_list[0].chain_id
              "
            >
              {{ dapp.chain_list[0].network }}
            </div>
            <div
              class="chain"
              v-if="dapp.chain_list.length > 1 || dapp.chain_list.length === 0"
            >
              Multi-Chain
            </div>
          </div>
        </div>
      </div>
      <div class="dapps dapp-list" v-if="dappList.length">
        <div class="top d-flex jc-between">
          <div class="text secondary-title">DApp List</div>
          <div
            class="text check"
            v-if="dappList.length > 3"
            @click="onCheckAllDappList"
          >
            {{ $t('checkAll') }}
          </div>
        </div>
        <div class="d-flex flex-wrap">
          <div
            class="dapp-item d-flex ai-center"
            v-for="(cItem, index) in dappList.slice(0, 3)"
            :key="index"
            @click.stop="goCollection(cItem)"
          >
            <img :src="cItem.logo_uri" />
            <div class="text name">{{ cItem.name }}</div>
            <div class="chain">{{ cItem.dapp_list.length }} Dapps</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FuzzySearch,
  FuzzySearchDappList,
  FuzzySearchDapps,
  chainNameMap,
} from '../utils'
import dappCollection from '../dapplist'

export default {
  props: {
    searchVal: {
      type: String,
    },
    isFocus: {
      type: Boolean,
    },
    historyList: {
      type: Array,
    },
    height: {
      type: String,
    },
  },
  data() {
    return {
      dapps: [],
      dappList: [],
      sHeight: '',
    }
  },
  created() {
    this.sHeight = this.height
  },
  computed: {
    chainNameMap() {
      return chainNameMap
    },
    searchTitle() {
      if (!this.dapps.length && !this.dappList.length) {
        return this.$t('noMatch')
      } else {
        return this.$t('searchTitle')
      }
    },
  },
  watch: {
    searchVal() {
      this.getSearch()
    },
    isFocus() {
      this.getSearch()
    },
    height() {
      this.sHeight = this.height
    },
  },

  methods: {
    getSearch() {
      this.getDappList()
      this.getDapps()
    },
    getDappList() {
      this.dappList = FuzzySearchDappList(dappCollection, this.searchVal)
    },
    getDapps() {
      this.dapps = FuzzySearchDapps(dappCollection, this.searchVal)
    },
    onHistory(item) {
      // console.log('item', item)
      this.$emit('getHomeVal', { isEnter: true, val: item })
    },
    onDapp(title) {
      console.log('onDapp', title)
      this.$emit('getHomeVal', { isEnter: true, val: title })
    },
    goCollection(cItem) {
      console.log('goCollection', cItem)
      // this.$emit('getData', cItem)
      this.$emit('getHomeVal', {
        isEnter: false,
        val: cItem.name,
        collection: true,
      })
    },
    onCheckAllDapps(val) {
      this.$emit('getHomeVal', { isEnter: true, val: val, checkAllDapps: true })
    },
    onCheckAllDappList() {
      this.$emit('checkAllDappList', {
        dappList: this.dappList,
        enterObj: { isEnter: false, val: this.searchVal, collection: true },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.search-drop-down {
  position: absolute;
  top: 65px;
  width: calc(100% - 31px);
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.1);
  padding: 20px 26px;
  .title {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
  }
  .secondary-title {
    opacity: 0.5;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    line-height: 20px;
  }
  .search-history {
    .history-wrap {
      margin-top: 6px;
      .history-item {
        cursor: pointer;
        line-height: 25px;
        margin-right: 20px;
        // &:nth-child(n + 2) {
        //   margin-left: 20px;
        // }
      }
    }
  }
  .possible {
    .check {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #2761e7;
      line-height: 17px;
      cursor: pointer;
    }
    .dapps {
      .top {
        margin: 16px 0 10px;
      }
      .dapp-item {
        width: 48%;
        cursor: pointer;
        margin-bottom: 10px;
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        .name {
          margin: 0 10px;
        }
        .chain {
          padding: 0 9px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #d7d7d7;
          border-radius: 11px;
          opacity: 0.5;
          font-size: 11px;
          font-family: PingFangSC, PingFangSC-Regular;
          text-align: center;
          color: #333333;
          white-space: nowrap;
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .search-drop-down {
    top: 75px;
    left: -16px;
    width: 100vw;
    // height: calc(100vh - v-bind(sHeight));
    background: #f5f9ff;
    z-index: 1000;
    padding: 0 16px;
    box-shadow: none;
    border-radius: 0;
    .secondary-title {
      font-size: 13px;
    }
    .possible {
      .check {
        font-size: 13px;
      }
      .dapps {
        .dapp-item {
          width: 100%;
          img {
            width: 29px;
            height: 29px;
          }
          .name {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
