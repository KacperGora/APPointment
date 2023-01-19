import { useEffect } from "react";

const useGetPickedValue = (setAction, array) => {
  useEffect(() => {
    setAction(...array.filter((value) => value.isActive));
  }, [array]);
};
export default useGetPickedValue;
