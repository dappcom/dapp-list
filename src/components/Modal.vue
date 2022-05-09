<template>
  <div class="modal">
    <div class="modal-content d-flex flex-column ai-center">
      <div class="text download">{{ $t('download') }}</div>
      <a
        class="product-item d-flex ai-center"
        v-for="(dItem, index) in downloadList"
        :key="index"
        :href="dItem.url"
      >
        <div class="icon-wrap d-flex ai-center jc-center">
          <img :src="dItem.icon" />
        </div>
        <div class="introduce">
          <div class="text title">
            {{ dItem.title }}
          </div>
          <div class="text title desc">
            {{ dItem.desc }}
          </div>
        </div>
      </a>
      <img
        class="delete-g"
        src="../assets/home/delete-g.png"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    downloadList() {
      return [
        {
          icon: require('../assets/home/app.png'),
          title: this.$t('tpApp'),
          desc: this.$t('tpAppDesc'),
          url: 'https://tokenpocket.pro/zh/download/app',
        },
        {
          icon: require('../assets/home/extension.png'),
          title: this.$t('tpExtension'),
          desc: this.$t('tpExtensionDesc'),
          url:
            this.$i18n.locale === 'en'
              ? 'https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii?hl=en'
              : 'https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii?hl=zh-CN',
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  &-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 544px;
    background: #ffffff;
    border-radius: 22px;
    padding: 36px 50px 42px 50px;

    .download {
      margin-bottom: 36px;
      font-size: 22px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
    }
    .product-item {
      width: 444px;
      height: 68px;
      border-radius: 16px;

      background: #fff;
      border: 1px solid #d7d7d7;
      cursor: pointer;

      .icon-wrap {
        margin-left: 90px;
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
          font-weight: 500;
          color: #333;
        }
        .desc {
          opacity: 0.5;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
        }
      }
    }
    .product-item:hover {
      background: #f5f9ff;
      border: 1px solid #f5f9ff;
      .introduce {
        .title {
          color: #2761e7;
        }
      }
    }
    :nth-child(3) {
      margin-top: 20px;
    }
    .delete-g {
      width: 14px;
      height: 14px;
      position: absolute;
      top: 13px;
      right: 13px;
      cursor: pointer;
    }
  }
}

@media screen and(max-width:767px) {
  .modal {
    &-content {
      width: 94vw;
      padding: 20px 38px 28px 32px;
      border-radius: 15px;

      .download {
        margin-bottom: 20px;
        font-size: 16px;
      }
      .product-item {
        width: 100%;
        height: 39px;
        justify-content: center;
        border-radius: 10px;
        background: #fff;
        border: 1px solid #d7d7d7;

        .icon-wrap {
          margin: 0;
          width: 25px;
          height: 25px;
          background: #f5f9ff;
          border-radius: 50%;
          img {
            width: 18px;
            height: 18px;
          }
        }
        .introduce {
          .title {
            color: #333;
          }
          .desc {
            display: none;
          }
        }
      }
      :nth-child(3) {
        margin-top: 15px;
      }
    }
  }
}
</style>
