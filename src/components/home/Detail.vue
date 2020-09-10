<template>
  <div class="detail-container">
    <h3 class="nav">
      <span>今日支出</span>
      <span>￥{{amountOfOut}}</span>
      <span>收入</span>
      <span>￥{{amountOfIn}}</span>

    </h3>
    <ul>
      <li class="list" v-for="(item,index) in todaySource " :key="index">
        <span class="left">
          <span class="tagName">{{item.tagName.toString()}}</span>
        <span class="notes">{{item.notes}}</span>
        </span>
        <span class="right">
          <span class="type">{{item.type}}</span>
          <span>￥</span>
          <span class="amount">{{item.amount}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import dayjs from 'dayjs';
  import fetchSpecialTimeAmount from '@/lib/fetchSpecialTimeAmount';
  import fetchSpecialDateData from '@/lib/fetchSpecialDateData';

  @Component
  export default class Detail extends Vue {

    created() {
      this.$store.commit('initDataSource');
    }

    today = dayjs().format('YYYY-MM-DD').toString();

    get dataSource() {
      return this.$store.state.moduleDataSource.data;
    }

    get amountOfIn() {
      return fetchSpecialTimeAmount('+', this.today, this.dataSource);
    }

    get amountOfOut() {
      return fetchSpecialTimeAmount('-', this.today, this.dataSource);
    }

    get todaySource() {
      return fetchSpecialDateData(this.dataSource, this.today,'day');
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/helper.scss";

  .detail-container {
    margin-top: 20px;

    .nav {
      transform: translateX(20px);


      > span {
        padding-right: 10px;
        font-family: $font-hei;
        word-wrap: break-word;
        word-break: normal;
      }
    }
  }

  ul {
    height: 45vh;
    overflow: auto;

    > .list {
      margin: 15px;
      padding: 10px;
      background: white;
      border-radius: 15px;
      font-family: $font-hei;
      display: flex;
      justify-content: space-between;

      > .left {
        display: flex;
        flex-direction: column;
        width: 80%;
        font-size: 18px;
        padding-left: 10px;

        > .notes {
          color: #AFAFAF;
          font-size: 14px;
        }
      }

      > .right {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }


  }

</style>