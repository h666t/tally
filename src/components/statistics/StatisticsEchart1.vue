<template>
  <div class="echart1-container">
    <div ref="main" id="main"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts from 'echarts';
  import mapMonthOrYear from '@/lib/mapMonthOrYear';
  import fetchSpecialTimeAmount from '@/lib/fetchSpecialTimeAmount';


  @Component export default class StatisticsEchart extends Vue {
    @Prop({required: true, type: String}) date!: string; //month
    @Prop({required: true, type: String}) type!: string;
    @Prop({required:true,type:String}) theBasisOfStatistics!: string

    created() {
      this.$store.commit('initDataSource');
    }

    fetchXData(date: string) {
      const x: string[] = [];
      mapMonthOrYear(date, this.date, (i: number) => {x.push(i.toString());});
      return x;
    }

    XData = this.fetchXData(this.theBasisOfStatistics)

    get dataSource() {
      return this.$store.state.moduleDataSource.data;
    }

    @Watch('theBasisOfStatistics')
      onTheBasisOfStatisticsChanged(){
      this.XData = this.fetchXData(this.theBasisOfStatistics)
      this.setEchart()
    }



    get YData() {
      const y: number[] = [];
      mapMonthOrYear(this.theBasisOfStatistics, this.date, (i: number) => {
        let monthOrDay = i.toString();
        monthOrDay.length === 1 ? monthOrDay = `0${i}` : monthOrDay;
        const amount = fetchSpecialTimeAmount(this.type, `${this.date}-${monthOrDay}`, this.dataSource);
        y.push(parseFloat(amount));
      });
      return y;
    }

    get maxYNumber(){
      return this.YData.sort((a,b)=>{return  b-a})[0]
    }


    get echartTitle() {
      if (this.type === '-') {
        return '支出'
      } else {
        return '收入'
      }
    }

    get myChart() {
      return echarts.init(this.$refs.main as HTMLDivElement);
    }

    setEchart() {
      this.myChart.setOption({
        backgroundColor:'#f5f4f9',
        title:{
          text:this.echartTitle
        },
        tooltip:{
          show:true,
          formatter: '{b0}号: {c0}元'
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
          left: '13%',
          bottom: '18%',
          top: '20%',
          right: '0%'
        }],
        dataZoom: [{
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '15%',
          bottom: 5,
          start: 0,
          end: 90 ,
          minSpan:35,
          maxSpan:35,
        }],
      })
    }


    @Watch('type')
    onTypeChanged() {
        this.setEchart()
    }

    mounted() {
      this.setEchart()
    }
  }
</script>

<style lang="scss" scoped>
.echart1-container{
  padding: 10px;
  background: #f5f4f9;
}

  #main {
    height: 350px;
    width: 350px;
  }
</style>