import Vue from 'vue'
import Vuex from 'vuex'
import moduleCalculator from '@/store/money/calculation';
import moduleTags from '@/store/money/tags';
import moduleDataSource from '@/store/money/dataSource';
import moduleStatisticsYear from '@/store/statistics/StatisticsYear'
Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    moduleCalculator,
    moduleTags,
    moduleDataSource,
    moduleStatisticsYear
  }
})
