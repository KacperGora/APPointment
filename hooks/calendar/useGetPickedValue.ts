import { useEffect } from "react";

const useGetPickedValue = (setAction, array) => {
  useEffect(() => {
    setAction(array.filter((value) => value.isActive)[0]);
  }, [array]);
};
export default useGetPickedValue;
