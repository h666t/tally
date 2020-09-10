type CalculatorScreenState = {
  forCalculationValue: string;
  amount: string;
}
const moduleCalculator = {
  state: () => ({
    forCalculationValue: '0',
    amount: '0'
  }),
  mutations: {
    initAmount(state: CalculatorScreenState){
      state.forCalculationValue = '0'
    },
    inputNumber(state: CalculatorScreenState,payload: string){
      if (payload === '清零') {
        state.forCalculationValue = '0';
        return;
      } else if (payload === '删除') {
        state.forCalculationValue = state.forCalculationValue.substr(0, state.forCalculationValue.length - 1);
        state.forCalculationValue === '' ? state.forCalculationValue = '0' : state.forCalculationValue;
        return;
      } else { // 点击数字和小数点时的逻辑
        if (state.forCalculationValue.indexOf('0') === 0
          && payload !== '.'
          && state.forCalculationValue.indexOf('0.') !== 0
          && payload !== 'OK'
        ) { //去掉位于最前面的0
          state.forCalculationValue += payload;
          state.forCalculationValue = state.forCalculationValue.substr(1, state.forCalculationValue.length - 1);
          return;
        } else if (state.forCalculationValue.indexOf('.') >= 0
          && payload === '.') { //避免出现多次小数点
          return;
        } else if (state.forCalculationValue.length >= 15) {// 最多16位数
          return;
        } else if (state.forCalculationValue === '0'
          && payload === '.') { // 直接点击小数点显示 0.
          state.forCalculationValue = '0.';
          return;
        }
        if (payload === 'OK') { // 点击OK往localhost中存储金额
          return;
        } else {
          state.forCalculationValue += payload;
          return;
        }
      }
      return;
    }
  },
  // actions: { ... },
  // getters: { ... }
}

export default moduleCalculator