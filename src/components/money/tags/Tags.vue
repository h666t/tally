<template>
  <div class="tag-list-container">
    <div class="tag-list">
      <div v-for="item in tagList" :key="item.id"
           @click="selectTags"
           :class="{selected:selectedList.indexOf(item.tagName)>=0}"
      >{{item.tagName}}
      </div>
      <div>
        <router-link to="/Money/EditTag">
          <Icon name="#setting"/>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  }) export default class Tags extends Vue {

    created() {
      this.$store.commit('initTags');
    }

    get tagList() {
      return this.$store.state.moduleTags.tagList;
    }

    @Prop({required: true, type: Array}) selectedList!: string[];


    selectTags(e: MouseEvent) {
      const item = (e.target as HTMLDivElement).innerText;
      const cloneSelectedList = JSON.parse(JSON.stringify(this.selectedList));
      if (cloneSelectedList.indexOf(item) >= 0) {
        const index = cloneSelectedList.indexOf(item);
        cloneSelectedList.splice(index, 1);
        this.$emit('update:selectedList', cloneSelectedList);
      } else {
        cloneSelectedList.push(item);
        this.$emit('update:selectedList', cloneSelectedList);
      }
    }

  }
</script>

<style lang="scss" scoped>
  .tag-list-container {
    height: 24vh;
    background: white;
    padding: 10px 8px;
    width: 100vw;
  }

  .tag-list {
    display: flex;
    background: white;
    justify-content: start;
    padding-left: 5px;
    padding-right: 5px;
    flex-wrap: wrap;


    > .selected {
      background: grey;
      color: white;
      border-radius: 20px;
    }

    > div {
      font-family: Consolas, monospace;
      line-height: 2.5;
      margin-right: 3%;
      margin-left: 3%;
      margin-bottom: 15px;
      width: 19%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .icon {

  }
</style>