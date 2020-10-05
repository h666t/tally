<template>
  <div id="App">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from  'vue'
  import {Component} from 'vue-property-decorator'
  @Component export default class App extends Vue{
    defaultTagNames = ['衣','食','住','行']
    created(){
      if (this.$store.state.moduleTags.tagList.length === 0){
        this.defaultTagNames.forEach(item=>this.$store.commit('createNewTag',item))
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/helper.scss";
  body{
    background: #f5f4f9;
  }

</style>
