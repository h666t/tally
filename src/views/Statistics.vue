<template>
<div class="statistics-container">
  <StatisticsDetail :date-for-show="dateForShow"
                    :date-for-calculate="dateForCalculate"
                    :type="type"
                    v-on:update:EchartType="type = $event"
                    :theBasisOfStatistics = 'theBasisOfStatistics'
                    v-on:update:changeTheBasisOfStatistics="theBasisOfStatistics = $event"

  />
  <div class="echart1">
    <StatisticsEchart1 :date="dateForCalculate"
                      :type="type"
                       :theBasisOfStatistics = 'theBasisOfStatistics'
    />
  </div>
</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import StatisticsDetail from '@/components/statistics/StatisticsDetail.vue';
  import StatisticsEchart1 from '@/components/statistics/StatisticsEchart1.vue';

  @Component({
    components: { StatisticsEchart1, StatisticsDetail}
  }) export default class Statistics extends Vue {


    type = '-';
    theBasisOfStatistics = 'month'

    created(){
      this.$store.commit('initStatisticsYear',this.theBasisOfStatistics)
    }

    @Watch('theBasisOfStatistics')
    onTheBasisOfStatisticsChanged(){
      this.$store.commit('initStatisticsYear',this.theBasisOfStatistics)
    }

    get dateForShow (){
      return  this.$store.state.moduleStatisticsYear.dateForShow
    }

    get dateForCalculate(){
      return  this.$store.state.moduleStatisticsYear.dateForCalculate
    }

  }
</script>

<style lang="scss" scoped>

  .statistics-container {
    background: #f5f4f9;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    > .echart1{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 4vh;
      background: white;
    }
  }
</style>