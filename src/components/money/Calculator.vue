<template>
  <div class="calculator-container">
    <label class="date">
      <span>请选择日期：</span>
      <input @input="fetchDate" type="date" :value="value">
    </label>
    <div class="screen">{{forCalculationValue}}</div>
    <label class="notes">
      备注： <input @input="changeNotes" class="notes-input" placeholder="写点备注吧...">
    </label>

    <div class="panel" @click="clickNumberPad">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清零</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>.</button>
      <button class="zero">0</button>
      <button class="OK">OK</button>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';


  @Component({
    components:{}
  })
  export default class Calculator extends Vue {

    @Prop({required: true, type: String}) selectedDate!: string;
    @Prop({required: true, type: String}) notes!: string;
    @Prop(Boolean) isDataReady!: boolean;

    created() {
      this.$store.commit('initAmount');
    }

    get forCalculationValue() {
      return this.$store.state.moduleCalculator.forCalculationValue;
    }

    get value() {
      const now = dayjs(new Date()).format('YYYY-MM-DD').toString();
      if (this.selectedDate === '') {
        this.$emit('update:selectedDate', now);
        return now;
      } else {
        return dayjs(this.selectedDate).format('YYYY-MM-DD').toString();
      }
    }

    fetchDate(e: InputEvent) {
      this.$emit('update:selectedDate', (e.target as HTMLInputElement).value);
    }

    clickNumberPad(e: MouseEvent) {
      this.$store.commit('inputNumber', (e.target as HTMLButtonElement).innerText);
      if ((e.target as HTMLButtonElement).innerText === 'OK') {
        this.$emit('update:dataReady', true);
      }
    }

    changeNotes(e: InputEvent) {
      if (e.data === null) {
        const cloneNotes = JSON.parse(JSON.stringify(this.notes));
        this.$emit('update:notes', cloneNotes.substr(0, this.notes.length - 1));
      } else {
        let cloneNotes = JSON.parse(JSON.stringify(this.notes));
        cloneNotes += e.data;
        this.$emit('update:notes', cloneNotes);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/helper.scss";

  .calculator-container {
    display: flex;
    flex-direction: column;

    > .notes {
      background: white;
      box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.25);
      line-height: 6vh;
      padding: 0 20px;

      > .notes-input {
        border: none;
        outline: none;
      }
    }

    > .screen {
      background: white;
      line-height: 8vh;
      display: flex;
      flex-direction: row-reverse;
      font-size: 36px;
      padding: 0 10px;
      font-family: Consolas, monospace;
      border-top: 1px solid rgba(0,0,0,0.25);
    }

    > .date {
      display: flex;
      justify-content: start;
      height: 4vh;
      background: white;
      padding: 2px 10px;

      > input {
        background: white;
        font-family: $font-hei;
        border: 1px solid rgba(0,0,0,0.5);
      }
    }

    > .panel {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      > button {
        border: 1px solid white;
        background-color: transparent;
        outline: none;
        font-family: $font-hei;
        font-size: 18px;
        padding: 20px;
        width: 25vw;
        min-height: 7.5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      > .OK {
        width: 50vw;
      }

      > .zero {
        width: 50vw;
      }
    }
  }
</style>