import { Meeting } from "../types";

const emptyEventDataChecker = (data: Meeting) => {
  const isEmpty =
    data.title.trim().length === 0 ||
    Object.values(data).some(
      (x) => x === undefined || x.length === 0 || x === "Invalid Date"
    );

  return isEmpty;
};
export default emptyEventDataChecker;
