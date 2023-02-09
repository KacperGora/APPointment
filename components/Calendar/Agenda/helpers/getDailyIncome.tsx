const getDailyIncome = (flatData) => {
  const dailyIncomeMap = new Map();

  flatData.map((element) => {
    return dailyIncomeMap.set(
      element.day,
      flatData
        .filter((el) => el.day === element.day)
        .map((element) => element.servicePrice)
        .reduce((acc, curr) => acc + curr, 0)
    );
  });
  const dailyIncomeObject = Object.fromEntries(dailyIncomeMap);
  return dailyIncomeObject;
};
export default getDailyIncome;
