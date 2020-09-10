const fetchSpecialTimeAmount = (type: string, date: string, dataSource: DataSourceItem[]) => {
  const amountArray: number[] = [];
  let result = 0;
  dataSource.map((item: DataSourceItem) => {
    if (item.date.indexOf(date) >= 0 && item.type === type) {
      amountArray.push(parseFloat(item.amount));
    }
  });
  amountArray.map(item => result += item);
  return result.toFixed(2);
};
export default fetchSpecialTimeAmount;