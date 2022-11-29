import { Meeting } from "../types";

const emptyEventDataChecker = (data: Meeting) => {
  const isEmpty =
    data.title.split(" ")[0].trim().length === 0 ||
    (data.title.split(" ")[1].trim().length === 0 &&
      Object.values(data).some(
        (x) => x === undefined || x.length === 0 || x === "Invalid Date"
      ));

  return isEmpty;
};
export default emptyEventDataChecker;
