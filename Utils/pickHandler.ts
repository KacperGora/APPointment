import { SelectiveOptions } from "../types";

function pickHandler(index: number, array: SelectiveOptions[], SetState: any) {
  const newArr = [...array];
  const oldIndex = newArr.findIndex((item) => item.isActive);
  if (oldIndex !== -1) {
    newArr[oldIndex] = {
      ...newArr[oldIndex],
      isActive: !newArr[oldIndex].isActive,
    };
  }
  newArr[index] = {
    ...newArr[index],
    isActive: !newArr[index].isActive,
  };

  SetState(newArr);
}
export default pickHandler;
