<template>
  <div class="statistics-container">
    <TopNav title="账单详情" path="/"/>

    <transition name="fade">
      <SelectedDate class="detail" v-if="isShowCalendar === 'true' && theBasisOfStatistics === 'year'"
                    :dateForShow="dateForShow"
                    :dateForCalculate="dateForCalculate"
      />
    </transition>

    <div  class="detail">

      <Calendar v-if="theBasisOfStatistics === 'year'"
                :isShowCalendar="isShowCalendar"
                v-on:update:isShowCalendar="isShowCalendar = $event"
      />

      <span class="date">
        {{dateForShow}}
      </span>
      <span class="in">
        <span>支出</span><span>￥{{amountOfOut}}</span>
      </span>
      <span class="out">
        <span>收入</span><span>￥{{amountOfIn}}</span>
      </span>
    </div>
    <div class="buttons" @click="changeType">
      <button class="out">支出</button>
      <button class="in">收入</button>

    </div>
    <div class="shift-container">
      <div></div>
      <button class="shift" @click="changeTheBasisOfStatisticsForShow">
        <Icon name="#shift"/>
        {{theBasisOfStatisticsForShow}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import TopNav from '@/components/reuse/TopNav.vue';
  import fetchSpecialTimeAmount from '@/lib/fetchSpecialTimeAmount';
  import Icon from '@/components/Icon.vue'
  import SelectedDate from '@/components/statistics/SelectedDate.vue';
  import Calendar from '@/components/statistics/Calendar.vue';

  @Component({
    components: {Calendar, SelectedDate, TopNav,Icon}
  }) export default class StatisticsDetail extends Vue {

    created() {
      this.$store.commit('initDataSource');
    }

    @Prop({required: true, type: String}) dateForShow!: string;
    @Prop({required: true, type: String}) dateForCalculate!: string;
    @Prop({required: true, type: String}) type!: string;
    @Prop({required:true,type:String}) theBasisOfStatistics!: string;
    isShowCalendar = 'false'


    get dataSource() {
      return this.$store.state.moduleDataSource.data;
    }

    get amountOfOut() {
      return fetchSpecialTimeAmount('-', this.dateForCalculate, this.dataSource);
    }

    get amountOfIn() {
      return fetchSpecialTimeAmount('+', this.dateForCalculate, this.dataSource);
    }

    get theBasisOfStatisticsForShow (){
      if(this.theBasisOfStatistics === 'month'){
        return '切换年账单'
      }else {
        return  '切换日账单'
      }
    }

    changeTheBasisOfStatisticsForShow(){
      if (this.theBasisOfStatistics === 'month'){
        this.$emit('update:changeTheBasisOfStatistics','year')
      }else {
        this.$emit('update:changeTheBasisOfStatistics','month')
      }
    }

    changeType(e: MouseEvent) {
      if ((e.target as HTMLButtonElement).innerText === '支出') {
        this.$emit('update:EchartType', '-');
      } else {
        this.$emit('update:EchartType', '+');
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/helper.scss";

  .statistics-container {
    background: white;
  }

  .detail {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    background: white;
    padding-left: 20px;
    padding-top: 25px;
    padding-bottom: 25px;
    position: relative;

    > .calendar{
      position: absolute;
      right: 50px;
    }


    > .date {
      font-weight: bold;
      font-family: $font-hei;
      padding-bottom: 8px;
    }

    > .in {
      font-family: $font-hei;
    }

    > .out {
      font-family: $font-hei;
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;

    > .in {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin-left: 10px;
    }

    > .out {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin-right: 10px;
    }

    > button {
      width: 70px;
      height: 30px;
      border: none;
      outline: none;
      background: #f60;
      border-radius: 15px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .shift-container{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    > .shift{
      margin-right: 20px;
      outline: none;
      border: none;
      color: #f60;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #f5f4f9;
      margin-bottom: 20px;
    }
    .icon{
      fill:#f60
    }
  }

  .fade-enter {
    opacity: 0;
    transform: translateY(-100px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s ease;
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }

</style>