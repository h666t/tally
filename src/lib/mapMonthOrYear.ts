import dayjs from 'dayjs';

const mapMonthOrYear = (monthOrYear: string, date: string, fn: any) => {

  if (monthOrYear === 'month') {
    for (let i = 1; i < dayjs(date).daysInMonth()+1; i++) {
      fn(i);
    }
  } else {
    for (let i = 1; i < 13; i++) {
      fn(i);
    }
  }

};

export default mapMonthOrYear;