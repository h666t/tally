<template>
  <div class="selectedDate-container">
    <span>
      往年数据
    </span>
      <ul>
        <li v-for="(item,index) in year" :key="index"
          @click="changeDate"
            :class="{selected: item === parseInt(beSelectedYear)}"
        >{{item}}</li>
      </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component export default class SelectedDate extends Vue {
    @Prop({required: true, type: String}) dateForShow!: string;
    @Prop({required: true, type: String}) dateForCalculate!: string;

    beSelectedYear = ''

    created(){
      this.$store.commit('initDataSource')
    }

    get dataSource() {
      return this.$store.state.moduleDataSource.data;
    }

    get year (){
      const container: number[] = []
      this.dataSource.map((item: DataSourceItem)=>{
        const YYYY = parseInt(item.date.split('-')[0])
        if (container.indexOf(YYYY)>=0){
          return;
        }else {
          container.push(YYYY)
        }
      })
      container.sort((a: number,b: number)=>{return b-a})
        return  container
    }

    changeDate(e: MouseEvent){
      this.$store.commit('updateStatisticsYear',(e.target as HTMLLIElement).innerText)
      this.beSelectedYear = (e.target as HTMLLIElement).innerText
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/helper.scss";
.selectedDate-container{
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  min-height: 100px;
   ul{
     display: flex;
     margin-top: 20px;
     width: 300px;
     height: 100px;
     flex-wrap: wrap;
     > li{
       width: 80px;
       height: 25px;
       margin: 10px;
       display: flex;
       align-items: center;
       justify-content: center;
       overflow: auto;
       font-family: $font-hei;
       &.selected{
         background: #9b9b9b;
         color: white;
         border-radius: 15px;
       }
     }
  }
}
</style>