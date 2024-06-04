export const generateMonthList = (
  startYear,
  startMonth,
  currentYear,
  currentMonth
) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );
  return Array.from({ length: (currentYear - startYear + 1) * 12 }, (_, i) => {
    const year = Math.floor(i / 12) + startYear;
    const month = i % 12;
    if (
      (year === startYear && month < startMonth) ||
      (year === currentYear && month > currentMonth)
    ) {
      return null;
    }
    return { name: months[month], year };
  }).filter(Boolean);
};
