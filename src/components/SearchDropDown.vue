<template>
  <div class="search-drop-down">
    <div class="search-history">
      <div class="text title">{{ $t('searchHistory') }}</div>
      <div class="history-wrap">
        <span
          class="text secondary-title history-item"
          v-for="item in 3"
          :key="item"
        >
          ethereum
        </span>
      </div>
    </div>
    <div class="possible">
      <div class="text title">{{ $t('searchTitle') }}</div>
      <div class="dapps">
        <div class="top">
          <div class="text secondary-title">Dapps</div>
          <div class="text check">{{ $t('checkAll') }}</div>
        </div>
      </div>
      <div class="dapp-list">
        <div class="top">
          <div class="text secondary-title">DApp List</div>
          <div class="text check">{{ $t('checkAll') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.search-drop-down {
  position: absolute;
  top: 65px;
  width: calc(100% - 31px);
  height: 310px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.1);
  padding: 20px 26px 30px;
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
      display: flex;
      flex-wrap: wrap;
      .history-item {
        cursor: pointer;
        &:nth-child(n + 2) {
          margin-left: 20px;
        }
      }
    }
  }
  .possible {
  }
}
</style>
