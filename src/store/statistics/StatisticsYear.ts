import dayjs from 'dayjs';

type State = {
  dateForShow: string;
  dateForCalculate: string;
}

const moduleStatisticsYear = {
  state: () => ({
    dateForShow : '',
    dateForCalculate : ''
  }),
  mutations: {
      initStatisticsYear(state: State,payload: string){
        if(payload === 'month'){
          state.dateForShow = dayjs().format('YYYY年MM月').toString();
          state.dateForCalculate = dayjs().format('YYYY-MM').toString();
        }else {
          state.dateForShow = dayjs().format('YYYY年').toString();
          state.dateForCalculate = dayjs().format('YYYY').toString();
        }
      },
    updateStatisticsYear(state: State,payload: string){
        state.dateForShow = `${payload}年`
        state.dateForCalculate = payload
    }
  },
};

export default moduleStatisticsYear