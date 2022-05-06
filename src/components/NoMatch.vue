<template>
  <div class="no-match" :class="{ isDetail: isDetail }">
    <img src="../assets/home/nodata.png" />
    <div class="text match">No match</div>
  </div>
</template>

<script>
export default {
  computed: {
    isDetail() {
      return this.$route.path === '/detail'
    },
  },
}
</script>

<style lang="scss" scoped>
.no-match {
  margin: 186px 0 0 31px;
  text-align: center;
  &.isDetail {
    margin: 186px 0 0;
  }
  img {
    width: 98px;
    height: 94px;
  }
  .match {
    text-align: center;
    color: #999999;
  }
}
@media screen and(max-width:767px) {
  .no-match {
    margin: 100px 0 50px;
    text-align: center;
    &.isDetail {
      margin: 110px 0 0;
    }
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
</style>
