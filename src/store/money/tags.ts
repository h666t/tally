import idCreator from '@/lib/idCreator';

const moduleTags = {
  state: () => ({
    tagList: [] as TagListState[],
    findedTagName: undefined
  }),
  mutations: {
    initTags(state: TagListState) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createNewTag(state: TagListState, payload: string) {
      const exitedTagName = state.tagList.map(item => item.tagName);
      if (payload === '') {
        window.alert('标签名不能为空');
        return;
      } else if (payload === null) {
        return;
      } else if (exitedTagName.indexOf(payload) >= 0) {
        window.alert('标签名重复');
        return;
      } else {
        const id = idCreator();
        state.tagList.push({id: id, tagName: payload});
        window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
      }
    },
    initFindedTagName(state: TagListState) {
      state.findedTagName = undefined;
    }
    ,
    findTagName(state: TagListState, payload: string) {
      state.tagList.map(item => {
        if (item.id.toString() === payload) {
          state.findedTagName = item.tagName;
        }
      });
    },
    updateTagName(state: TagListState, payload: [string, string]) {
      const id = payload[0];
      const newValue = payload[1];
      const oldValue = state.findedTagName;
      if (newValue === '') {
        window.alert('标签名不能为空');
        return
      }
      const nameContainer: string[] = []
      state.tagList.forEach(item=>{
        nameContainer.push(item.tagName)
      })
      if (nameContainer.indexOf(newValue) >= 0 && newValue !== oldValue){
       window.alert('标签已存在')
        return;
      }
      state.tagList.forEach(item=>{
        if ( JSON.stringify(item.id) === id ){
          item.tagName = newValue
          window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        }
      })
    },
    removeTag(state: TagListState, payload: string) {
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id.toString() === payload) {
          state.tagList.splice(i, 1);
        }
      }
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  },
};

export default moduleTags;