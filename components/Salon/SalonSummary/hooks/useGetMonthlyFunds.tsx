type SpendingType = {
  name: string;
  value: number;
  type: "spending" | "income";
  date: string;
  folder: string;
};
const useGetMonthlyFunds = (
  data: SpendingType[],
  type: "spending" | "income",
  month: any
) => {
  return Object.values(data)
    .flat()
    .filter((el: SpendingType) => el.type === type)
    .map((el: SpendingType) => el.value)
    .reduce((acc, val) => (acc += val), 0);
};
export default useGetMonthlyFunds;
