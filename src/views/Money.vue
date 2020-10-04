<template>
  <div class="container">
    <div>
      <Nav :inOutPutType="inOutPutType"
           v-on:update:changeType="inOutPutType = $event"/>
      <Tags :selectedList="selectedList"
            v-on:update:selectedList="selectedList = $event"/>
    </div>
    <div>
      <Calculator :selectedDate="selectedDate"
                  v-on:update:selectedDate="selectedDate = $event"
                  :notes="notes"
                  v-on:update:notes="notes = $event"
                  :isDataReady="isDataReady"
                  v-on:update:dataReady="isDataReady = $event"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Nav from '@/components/money/Nav.vue';
  import Tags from '@/components/money/tags/Tags.vue';
  import Calculator from '@/components/money/Calculator.vue';
  import dayjs from 'dayjs';
  @Component({
    components: {Tags, Nav, Calculator}
  }) export default class Money extends Vue {
    inOutPutType = '-';
    selectedList: string[] = [];
    selectedDate = '';
    notes = '';

    created() {
      this.$store.commit('initDataSource');
    }

    get amount() {
      return this.$store.state.moduleCalculator.forCalculationValue;
    }

    isDataReady = false;

    @Watch('isDataReady')
    onIsDataReadyChanged() {
      if (this.isDataReady) {
        if (this.selectedList.length === 0) {
          window.alert('请至少选择一个标签');
          this.isDataReady = false;
          return;
        }
        this.$store.commit('saveDataSource',
          {
            type: this.inOutPutType,
            tagName: this.selectedList,
            date: this.selectedDate,
            amount: this.amount,
            notes: this.notes
          });
        this.selectedList = []
        this.notes = ''
        this.selectedDate=`${dayjs().format('YYYY-MM-DD')}`
        this.$store.commit('initAmount')
      }
      this.isDataReady = false;
    }

  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    background: #f5f4f9;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>


