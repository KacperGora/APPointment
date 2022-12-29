import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { SaloonContext } from "../../store/SaloonStore";

const useGetCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const salonCtx = useContext(SaloonContext);
  useEffect(() => {
    const q = query(collection(db, "customers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setCustomers(users);
      salonCtx.getCustomers(users);
    });
    return () => unsubscribe();
  }, []);

  return customers;
};
export default useGetCustomers;
