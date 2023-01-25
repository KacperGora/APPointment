import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { SaloonContext } from "../../store/SaloonStore";

const useGetCustomers = () => {
  const salonCtx = useContext(SaloonContext);
  const [fetchedCustomers, setFetchedCustomers] = useState([]);
  const tempArr = [];
  useEffect(() => {
    const q = query(collection(db, "customers"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data());
      });
      setFetchedCustomers(tempArr);
    });
  }, []);
  salonCtx.getCustomers(fetchedCustomers);
  return fetchedCustomers;
};
export default useGetCustomers;
