<template>
  <div class="search-wrap d-flex ai-center" :class="{ isDetail, isMobile }">
    <img v-if="isFocus || inputVal" src="../assets/home/search.png" />
    <img v-else src="../assets/home/search-g.png" />
    <input
      class="text flex-1"
      type="text"
      :placeholder="searchText"
      v-model="inputVal"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="onEnter"
      ref="inputs"
    />
    <img
      v-if="inputVal"
      src="../assets/home/delete.png"
      @click="
        inputVal = ''
        $refs.inputs.focus()
      "
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: !!navigator.userAgent
        .toLowerCase()
        .match(
          /(ipod|iphone|android|coolpad|tokenpocket|mmp|smartphone|midp|wap|xoom|j2me|blackberry)/i
        ),
      inputVal: '',
      isFocus: false,
    }
  },
  computed: {
    isDetail() {
      // return this.$route.path === '/detail' && !this.isMobile
      return this.$route.path === '/detail'
    },
    searchText() {
      return this.$t('search')
    },
  },
  methods: {
    onFocus() {
      this.isFocus = true
    },
    onBlur() {
      this.isFocus = false
      if (!this.inputVal) {
        this.$emit('reset')
      }
    },
    onEnter() {
      if (this.isDetail) {
        this.$emit('getDetailVal', this.inputVal)
      } else {
        this.$emit('getHomeVal', this.inputVal)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search-wrap {
  height: 38px;
  border: 1px solid #d7d7d7;
  border-radius: 24px;
  &.isDetail {
    margin-left: 249px;
    flex: 1;
  }
  img {
    margin: 0 14px 0 16px;
    width: 16px;
    height: 16px;
  }
  input {
    background: #f5f9ff;
    border: none;
    width: 100%;
    margin-right: 5px;
  }
}
@media screen and(max-width:767px) {
  .search-wrap {
    position: relative;
    border: none;
    height: 30px;
    &.isDetail {
      width: 180px;
    }
    &.isMobile {
      margin: 0;
      flex: none;
    }
    img {
      position: relative;
      z-index: 1;
      width: 11px;
      height: 11px;
      margin: 0 10px 0 8px;
    }
    input {
      position: relative;
      z-index: 1;
      font-size: 11px;
    }
  }
  .search-wrap:after {
    content: '';
    position: absolute;
    z-index: 0;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 1px solid #d7d7d7;
    transform: scale(0.5);
    border-radius: 24px;
  }
}
</style>
