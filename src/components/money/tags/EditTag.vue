<template>
  <div class="container">
    <TopNav path="/Money" title="标签详情"/>
    <div class="tags-wrapper">
      <ul>
        <router-link v-for="item in tagList" :key="item.id" :to='`/Money/EditTag/RemoveTag/${item.id}`'>
        <li >
          {{item.tagName}}
            <Icon name="#right"/>
        </li>
        </router-link>
      </ul>
    </div>

    <button @click="createNewTag">新建标签</button>
  </div>


</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Close from '@/components/reuse/Close.vue';
  import Icon from '@/components/Icon.vue';
  import TopNav from '@/components/reuse/TopNav.vue';

  @Component({
    components: {TopNav, Icon, Close}
  }) export default class EditTag extends Vue {

    created() {
      this.$store.commit('initTags');
    }

    get tagList() {
      return this.$store.state.moduleTags.tagList;
    }

    createNewTag() {
      const tagName = window.prompt('请输入标签名');
      if (tagName === '') {
        window.alert('标签名不能为空');
        return;
      }
      if (this.$store.state.moduleTags.tagList.indexOf(tagName) >= 0) {
        window.alert('标签名重复');
        return;
      }
      this.$store.commit('createNewTag', tagName);

    }
  }
</script>

<style lang="scss" scoped>

  .container {
    background: #f5f4f9;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;

    > .tags-wrapper {
      overflow: auto;
      height: 500px;
    }
  }

  li {
    line-height: 2.5;
    background: white;
    border-bottom: 1px solid rgb(0, 0, 0, 0.25);
    padding: 2px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Consolas, monospace;
  }

  button {
    outline: none;
    border: none;
    background:  #f60;
    color:white;
    padding: 5px;
    border-radius: 8px;
    width: 80px;
    position: absolute;
    left: 50%;
    top: 580px;
    transform: translateX(-50%);
  }

</style>