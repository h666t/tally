<template>
  <div class="container">
    <div class="in-out-container">
      <div class="out">
        <span class="word">本月收入</span>
        <span class="number">￥{{MonthAmountOfIn}}</span>
      </div>
      <div class="in">
        <span class="word">本月支出</span>
        <span class="number">￥{{MonthAmountOfOut}}</span>
      </div>
      <router-link class="link" to="/Statistics">查看图表分析</router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import dayjs from 'dayjs';
  import fetchSpecialTimeAmount from '@/lib/fetchSpecialTimeAmount';

  @Component export default class Shower extends Vue {

    created() {
      this.$store.commit('initDataSource');
    }

    get dataSource() {
      return this.$store.state.moduleDataSource.data;
    }

    get yearAndMonth() {
      const year = dayjs().year().toString();
      let month = (dayjs().month() + 1).toString();

      if (month.length === 1) {
        month = `0${month}`;
      }
      return `${year}-${month}`;
    }

    get MonthAmountOfIn() {
      return fetchSpecialTimeAmount('+', this.yearAndMonth, this.dataSource);
    }

    get MonthAmountOfOut() {
      return fetchSpecialTimeAmount('-', this.yearAndMonth, this.dataSource);
    }


  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/helper.scss";

  .container {
    display: flex;
    justify-content: center;
    align-items: center;

    .in-out-container {
      width: 85%;
      height: 20vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      position: relative;
      background: white;
      border-radius: 20px;

      .in {
        position: absolute;
        left: 10%;
        top: 20%;

        .word {
          font-size: 14px;
          color: #9B9B9B;
          font-family: $font-hei;
        }

        .number {
          position: absolute;
          left: 0;
          top: 20px;
          font-size: 22px;
          font-family: $font-hei;
          width: 120px;
          word-wrap:break-word;
          word-break:normal;
        }

      }

      .out {
        position: absolute;
        right: 25%;
        top: 20%;

        .word {
          font-size: 14px;
          color: #9B9B9B;
          font-family: $font-hei;

        }

        .number {
          position: absolute;
          left: 0;
          top: 20px;
          font-size: 22px;
          font-family: $font-hei;
          word-wrap:break-word;
          word-break:normal;
        }
      }

      .link {
        position: absolute;
        bottom: 15%;
        font-size: 14px;
        color: #0F9570;
      }
    }

  }
</style>