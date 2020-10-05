import mapMonthOrYear from '@/lib/mapMonthOrYear';
import fetchSpecialDateData from '@/lib/fetchSpecialDateData';
import dayjs from 'dayjs';

const fetchEchartDate = () => {
  const  fetchXData = (theBasisOfStatistics: string,date: string) => {
    const x: string[] = [];
    mapMonthOrYear(theBasisOfStatistics, date, (i: number) => {x.push(i.toString());});
    return x;
  }

  const fetchYData = (theBasisOfStatistics: string,type: string,dataSource: DataSourceItem[],whichYear: string) => {
    const getYDataContainer = (specialTime: string,dayOrOthers: string) => {
      const result: {date: string; amount: number}[] = []
      const dateContainer: string[] = []
      let container = fetchSpecialDateData(dataSource,specialTime,dayOrOthers)
      container = container.filter(item=>item.type === type) // 获取所有type === ’+‘ 的数据
      container.forEach(item=>{ // 获取所有不重复的日期
        if (dateContainer.indexOf(item.date) < 0 ){
          dateContainer.push(item.date)
        }
      })
      dateContainer.forEach(item=>result.push({date:item,amount:0})) // 把{date:'xxx',amount:0} 写好
      result.forEach(item=>{
        let amount = 0
        container.forEach(x=>{
          if (item.date === x.date){
            amount = amount + parseFloat(x.amount)
          }
        })
        item.amount = amount
      })
      return result
    }
      const Y: number[] = []
      if (theBasisOfStatistics === 'month'){
        for (let i = 1; i <= dayjs().daysInMonth(); i++){ //先创建好空数组
          Y.push(0)
        }
        getYDataContainer(`${dayjs().format('YYYY-MM')}`,'others').forEach(item=>{
          const index = parseInt(item.date.substring(8,10))
          Y.splice(index-1,1,item.amount)
        })
      }
      if (theBasisOfStatistics === 'year'){
        for (let i = 1; i <= 12; i++){
          Y.push(0)
        }
        const monthContainer: number[] = []
        const result: {date: number;amount: number}[] = []
        const specialDataSource = getYDataContainer(whichYear, 'others')
        specialDataSource.forEach(item=>{ //获取所有不重复的月份
          const month = parseInt(item.date.substring(5,7))
          if (monthContainer.indexOf(month) < 0){
            monthContainer.push(month)
          }
        })
        monthContainer.forEach(item=>{ // 获取 {date:'2020',amount : 0}[] 的数据
          result.push({date: item,amount: 0})
        })
        result.forEach(item=>{ // 获取 {date:'2020',amount : xxx}[] 的数据
          let amount = 0
          specialDataSource.forEach(x=>{
            if (parseInt(x.date.substring(5,7)) === item.date){
              amount += x.amount
            }
          })
          item.amount = amount
        })
        result.forEach(item=>{
          Y.splice(item.date-1,1,item.amount)
        })
      }
      return Y
    }

  return {fetchXData,fetchYData}
}

export default fetchEchartDate