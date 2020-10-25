<template>
  <div class="echart1-container">
    <div ref="main" id="main"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts from 'echarts';
  import dayjs from 'dayjs';
  import fetchEchartDate from '@/lib/fetchEchartDate';

  @Component export default class StatisticsEchart extends Vue {
    @Prop({required: true, type: String}) date!: string; //month
    @Prop({required: true, type: String}) type!: string;
    @Prop({required:true,type:String}) theBasisOfStatistics!: string
    echartShowHashTable = {
      year:{
        '-':`${this.date.substring(0,4)}年支出`,
        '+':`${this.date.substring(0,4)}年收入`
      },
      month: {
        '-':`${dayjs().format('YYYY年MM月')}支出`,
        '+':`${dayjs().format('YYYY年MM月')}收入`
      }
    }
    created() {
      this.$store.commit('initDataSource');
    }

    echartTitle = this.echartShowHashTable[this.theBasisOfStatistics as 'month'|'year'][this.type as '+'|'-']
    XData = fetchEchartDate().fetchXData(this.theBasisOfStatistics,this.date)
    YData = fetchEchartDate().fetchYData(this.theBasisOfStatistics,this.type,this.$store.state.moduleDataSource.data,this.date.substring(0,4))

     updateYData(){
       this.YData = fetchEchartDate().fetchYData(this.theBasisOfStatistics,this.type,this.$store.state.moduleDataSource.data,this.date.substring(0,4))
    }

    updateXData(){
      this.XData = fetchEchartDate().fetchXData(this.theBasisOfStatistics,this.date)
    }

    updateEchartTitle(){
      this.echartTitle = this.echartShowHashTable[this.theBasisOfStatistics as 'month'|'year'][this.type as '+'|'-']
    }

    get dataSource() {
      return this.$store.state.moduleDataSource.data;
    }

    @Watch('theBasisOfStatistics')
      onTheBasisOfStatisticsChanged(){
      this.updateXData()
      this.updateYData()
      this.updateEchartTitle()
      this.setEchart()
    }

    @Watch('type')
    onTypeChanged() {
      this.updateYData()
      this.updateEchartTitle()
      this.setEchart()
    }

    @Watch('date')
    onDateChanged() {
      this.updateYData()
      this.updateEchartTitle()
      this.setEchart()
    }

    get maxYNumber(){
      const cloneYData = JSON.parse(JSON.stringify(this.YData))
      return cloneYData.sort((a: number,b: number)=>{return  b-a})[0]
    }

    get myChart() {
      return echarts.init(this.$refs.main as HTMLDivElement);
    }

    setEchart() {
      this.myChart.setOption({
        backgroundColor:'white',
        title:{
          text:this.echartTitle
        },
        tooltip:{
          show:true,
          formatter: `${this.theBasisOfStatistics === 'month' ? "{b0}号: {c0}元" : "{b0}月: {c0}元"}`
        },
        xAxis: {
          type: 'category',
          data: this.XData,
          axisTick:{
            alignWithLabel:true
          }
        },
        yAxis: {
          type: 'value',
          max: this.maxYNumber,
          min: 0,
        },
        series: [{
          data: this.YData,
          type: 'line',
          symbol:'circle',
          symbolSize:15,
          itemStyle:{
            color:'rgb(255,86,88)',
          },
        }],
        grid: [{
          left: '50',
          right: 0
        }],
      })
    }
    mounted() {
      this.setEchart()
    }
  }
</script>

<style lang="scss" scoped>
.echart1-container{
  padding: 10px;
  background: white;
  overflow: auto;
  &::-webkit-scrollbar{
    display: none;
  }
}

  #main {
    height: 300px;
    width: 500px;
  }
</style>