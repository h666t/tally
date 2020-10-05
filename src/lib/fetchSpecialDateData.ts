const fetchSpecialDateData = (dataSource: DataSourceItem[], specialTime: string,dayOrOthers: string) => {
  const container: DataSourceItem[] = [];
  if (dayOrOthers === 'day'){
    dataSource.map((item: DataSourceItem) => {
      if (item.date === specialTime) {
        container.push(item);
      }
    });
    return container;
  }else {
    dataSource.map((item: DataSourceItem) => {
      if (item.date.indexOf(specialTime)>=0) {
        container.push(item);
      }
    });
    return container;
  }

};

export default fetchSpecialDateData;