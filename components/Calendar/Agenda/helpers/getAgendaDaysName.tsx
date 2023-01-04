export const getAgendaDays = (date) => {
  const nameMonth = date?.toDate().toLocaleDateString("default", {
    month: "short",
  });
  const nameDay = date
    ?.toDate()
    .toLocaleDateString("default", {
      weekday: "short",
    })
    .split(".")[0];
  return { nameMonth, nameDay };
};
