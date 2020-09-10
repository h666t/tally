<template>
    <span @click="changeIsShowCalendar" class="calendar">
        <Icon  name="#calendar"/>
      </span>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue'

  @Component({components:{Icon}})
  export default class Calendar extends Vue {
    @Prop({required:true,type:String}) isShowCalendar!: string
    changeIsShowCalendar(){
      if (this.isShowCalendar === 'false'){
        this.$emit('update:isShowCalendar' , 'true')
      }else{
        this.$emit('update:isShowCalendar' , 'false')
      }
      console.log(this.isShowCalendar);
    }
  }
</script>

<style lang="scss" scoped>

</style>