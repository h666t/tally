<template>
  <nav>
    <div class="nav">
      <Close :path="path"/>
      <span>{{title}}</span>
      <div></div>
    </div>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Close from '@/components/reuse/Close.vue';

  @Component({
    components: {Close}
  })
  export default class TopNav extends Vue {
    @Prop({required: true, type: String}) title!: string;
    @Prop({required: true, type: String}) path!: string;
  }
</script>

<style lang="scss" scoped>
  .nav {
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
    align-items: center;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    background: #EBEFF2;
  }
</style>