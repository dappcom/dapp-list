<template>
  <div class="menu-mobile" :style="{height: `calc(100vh - ${menuTop}px)`, top: menuTop+'px'}" @click="$emit('close')">
    <div class="menu-content">
      <div
        class="menu-item"
        v-for="(navItem, index) in mobileDropDownList"
        :key="index"
        @click.stop="onNavItem(navItem)"
      >
        <div class="menu-item-title">
          <img class="icon" v-if="navItem.icon" :src="navItem.icon" />
          <div>{{ navItem.title }}</div>
          <img
            class="arrow-down"
            :class="{ active: isChildBox }"
            v-if="navItem.lang"
            src="../assets/home/arrow-down.png"
          />
        </div>
        <div class="lang-list-box" v-if="isChildBox" @click="onChangeLang">
          <div
            class="lang-list"
            v-for="(langItem, index) in navItem.children"
            :key="index"
            :data-lang="langItem.lang"
          >
            <div class="text title">
              {{ langItem.langText }}
            </div>
            <div
              class="line"
              :class="{ noshow: index === navItem.children.length - 1 }"
            ></div>
          </div>
        </div>
        <div
          class="line"
          :class="{ noshow: index === mobileDropDownList.length - 1 }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuTop: {
      type: Number,
    },
  },
  data() {
    return {
      isChildBox: false,
    }
  },
  computed: {
    mobileDropDownList() {
      return [
        {
          icon: require('../assets/home/github.png'),
          title: 'Github',
          url: 'https://github.com/dappcom/dapp-list',
        },
        {
          title: this.$t('download'),
        },
        {
          title: this.$t('course'),
          url:
            this.$i18n.locale === 'en'
              ? 'https://theodore-ratliff.gitbook.io/fen-xiang/CN/tp-tutorial/dapplist'
              : 'https://theodore-ratliff.gitbook.io/fen-xiang/CN/tp-tutorial/dapplist',
        },
        {
          title: this.$t('langText'),
          lang: true,
          children: [
            { langText: '简体', lang: 'zh' },
            { langText: 'English', lang: 'en' },
          ],
        },
      ]
    },
  },
  mounted() {
    // 监听，除了点击自己，点击其他地方将自身隐藏
    // document.addEventListener('click', this.onOutside)
  },
  methods: {
    onOutside(e) {
      const languageBtn = this.$refs.languageBtn
      if (!languageBtn.contains(e.target)) {
        const contentWrap = document.querySelector('.menu-content')
        if (contentWrap) {
          if (!contentWrap.contains(e.target)) {
            this.isShowLanguageBox = false
            this.isShowLanguageListBox = false
          }
        }
      }
    },
    onNavItem(navItem) {
      if (navItem.url) {
        window.open(navItem.url)
      } else if (navItem.children) {
        this.isChildBox = !this.isChildBox
      } else if (navItem.title === 'Download') {
        this.$emit('showMenuMobile')
      }
    },
    onChangeLang() {
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'zh'
      } else {
        this.$i18n.locale = 'en'
      }
    },
    openUrl(url, index) {
      if (index === 1) {
        window.open(url, '_self')
      } else {
        window.open(url)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-mobile {
  position: fixed;
  z-index: 9997;
  top: 84px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 84px);
  background: rgba(0, 0, 0, 0.7);
  .menu-content {
    width: 100vw;
    background: #fff;
    .menu-item {
      color: #333;
      font-size: 12px;
      transition: height 1s;
      .menu-item-title {
        height: 49px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          margin-right: 7px;
          width: 13px;
          height: 13px;
        }
        .arrow-down {
          transform-origin: center center;
          transform: rotate(-90deg);
          width: 15px;
          height: 15px;
          &.active {
            transform: rotate(0);
          }
        }
      }
      .line {
        width: 94vw;
        margin: 0 auto;
        height: 1px;
        background: #d7d7d7;
        transform: scaleY(0.5);
        &.noshow {
          background: #fff;
        }
      }

      .lang-list-box {
        background: #f7f5ff;
        .lang-list {
          .title {
            height: 49px;
            text-align: center;
            line-height: 50px;
            font-size: 12px;
          }
          .line {
            background: #fff;
            &.noshow {
              background: #f7f5ff;
            }
          }
        }
      }
    }
  }
}
</style>
