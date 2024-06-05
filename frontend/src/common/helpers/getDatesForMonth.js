export const getDatesForMonth = (month, year) => {
  let dates = [];
  let date = new Date(year, month, 1);
  let endDate = new Date(year, month + 1, 0);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  while (date <= endDate && date <= today) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
};
