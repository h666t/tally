<template>
  <nav>
    <Close path="/"/>
    <div class="inoutWrapper" @click="changeInOutPutType">
      <button class="in" :class="{selected:this.inOutPutType==='-'}">支出</button>
      <button class="out" :class="{selected:this.inOutPutType==='+'}">收入</button>
    </div>
    <div></div>
  </nav>
</template>


<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import Close from '@/components/reuse/Close.vue';

  @Component({
    components: {Close, Icon}
  })
  export default class Nav extends Vue {
    @Prop({required: true, type: String}) inOutPutType!: string;

    changeInOutPutType(e: MouseEvent) {
      const t = (e.target as HTMLDivElement).innerText;
      t === '支出' ? this.$emit('update:changeType', '-') : this.$emit('update:changeType', '+');
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/helper.scss';

  nav {
    display: flex;
    background: #EBEFF2;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:  15px 20px;



    > .inoutWrapper {
      display: flex;
      justify-content: center;
      align-items: center;


      > .selected {
        border-bottom: 2px solid black;
      }

      > button {
        border: 0;
        background-color: transparent;
        outline: none;
        font-family: $font-hei;
        font-size: 18px;

      }

      > .in {
        margin-right: 8px;
        position: relative;
        padding: 3px;

      }

      > .out {
        margin-left: 8px;
        position: relative;
        padding: 3px;
      }
    }
  }

</style>

