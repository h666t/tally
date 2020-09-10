<template>
  <div class="close">
    <router-link :to="path">
      <Icon name="#close"/>
    </router-link>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  }) export default class Close extends Vue {
    @Prop({required: true, type: String}) path!: string;
  }
</script>

<style lang="scss" scoped>

</style>