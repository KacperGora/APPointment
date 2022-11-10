import { useContext, useEffect, useState } from "react";
import { DefaultSectionT } from "react-native";
import { MeetingsContext } from "../../store/store";

const useSortData = () => {
  const ctx = useContext(MeetingsContext);
  const meetings = ctx.meetings;
  const newArr: DefaultSectionT[] = [];
  const [sortedArr, setSortedArr] = useState<DefaultSectionT[]>([]);
  useEffect(() => {
    for (const [key, value] of Object.entries(meetings)) {
      newArr.push({ key: key, data: [...value] });
    }
    setSortedArr(
      newArr.sort(
        (a, b) => new Date(a.key).getTime() - new Date(b.key).getTime()
      )
    );
  }, [meetings]);

  return sortedArr;
};
export default useSortData;
