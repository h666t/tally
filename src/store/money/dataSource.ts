type State = {
  data: DataSourceItem[];
}

const moduleDataSource = {
  state: () => ({
    data: [] as DataSourceItem[]
  }),
  mutations: {
    initDataSource(state: State) {
      state.data = JSON.parse(window.localStorage.getItem('dataSource') || '[]');
    },
    saveDataSource(state: State, payload: DataSourceItem) {
      state.data.push(payload)
      window.localStorage.setItem('dataSource', JSON.stringify(state.data));
    }
  },


};

export default moduleDataSource;