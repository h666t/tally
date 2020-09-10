<template>
    <svg class="icon">
      <use :xlink:href="name" />
    </svg>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  const importAll = (requireContent: __WebpackModuleApi.RequireContext) => requireContent.keys().forEach(requireContent);
  try {
    importAll(require.context('../assets/icon', true, /\.svg$/));
  } catch (e) {
    console.log(e);
  }
  @Component
  export default class Icon extends Vue {
    @Prop(String) name!: string;
  }
</script>

<style lang="scss" scoped>
  .icon {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>