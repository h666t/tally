<template>
  <div>
    <TopNav path="/Money/EditTag" title="编辑标签"/>
    <div class="container">
      <div class="input-container">
        <label>标签：
          <input type="text" :value="tagName" @change="getNewValue"/>
        </label>
      </div>
      <div class="buttons">
        <button @click="changeTagName">确定</button>
        <button @click="removeTag">删除</button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import TopNav from '@/components/reuse/TopNav.vue';

  @Component({
    components: {TopNav}
  }) export default class RemoveTag extends Vue {
    created() {
      this.$store.commit('initTags');
      this.$store.commit('initFindedTagName');
    }

    get tagName() {
      this.$store.commit('findTagName', this.$route.params.id);
      return this.$store.state.moduleTags.findedTagName;
    }

    newValue = this.tagName;

    getNewValue(e: InputEvent) {
      this.newValue = (e.target as HTMLInputElement).value;
    }

    changeTagName() {
      this.$store.commit('updateTagName', [this.$route.params.id, this.newValue]);
      this.$router.replace('/Money/EditTag');
    }

    removeTag() {
      this.$store.commit('removeTag', this.$route.params.id);
      this.$router.replace('/Money/EditTag');
    }

  }
</script>

<style lang="scss" scoped>
  .container {
    background: #f5f4f9;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    > .input-container {
      background: white;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;

      > label {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;


        > input {
          width: 70vw;
          background: white;
          outline: none;
          border: none;
        }
      }
    }

    > .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      padding-top: 20px;

      > button {
        margin: 10px;
        outline: none;
        border: none;
        background: #f60;
        color:white;
        padding: 5px;
        border-radius: 8px;
        width: 80px;
      }
    }
  }
</style>