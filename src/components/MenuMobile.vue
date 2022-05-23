<template>
  <div
    class="menu-mobile"
    :style="{ height: `calc(100vh - ${menuTop}px)`, top: menuTop + 'px' }"
    @click="$emit('close')"
  >
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
            :class="{ active: navItem.isShow }"
            v-if="navItem.lang"
            src="../assets/home/arrow-down.png"
          />
        </div>
        <div class="lang-list-box" v-if="navItem.isShow">
          <div
            class="lang-list"
            v-for="(langItem, index) in navItem.children"
            :key="index"
            @click="onChangeLang(langItem.lang)"
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
      mobileDropDownList: [
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
          isShow: false,
          children: [
            { langText: '简体', lang: 'zh' },
            { langText: 'English', lang: 'en' },
          ],
        },
      ],
    }
  },
  methods: {
    onNavItem(navItem) {
      if (navItem.url) {
        window.open(navItem.url)
      } else if (navItem.children) {
        navItem.isShow = !navItem.isShow
      } else if (navItem.title === 'Download') {
        this.$emit('showMenuMobile')
      }
    },
    onChangeLang(lang) {
      this.$i18n.locale = lang
      window.localStorage.setItem('locale', this.$i18n.locale)
      this.$emit('close')
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
