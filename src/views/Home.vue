<template>
  <div class="home-container">
    <nav>极简记账</nav>
    <Shower/>
   <Detail/>
    <button>
      <router-link to="/Money">记一笔</router-link>
    </button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Nav from '@/components/money/Nav.vue';
  import Shower from '@/components/home/Shower.vue';
  import Detail from '@/components/home/Detail.vue';

  @Component({
    components: {Detail, Shower, Nav}
  }) export default class Money extends Vue {

  }
</script>

<style lang="scss" scoped>
  .home-container {
    height: 100vh;
    background: #f5f4f9;
    position: relative;
    overflow: hidden;

    nav {
      display: flex;
      justify-content: space-between;
      padding: 12px 20px;
      align-items: center;
      background: #EBEFF2;
      margin-bottom: 20px;
    }
  }

  button {
    border: none;
    outline: none;
    height: 43px;
    width: 123px;
    border-radius: 20px;
    background: #f60;
    position: absolute;
    right: 20px;
    color: white;
    bottom: 40px;
  }


</style>