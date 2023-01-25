import { collection, onSnapshot, query } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/firebase";

const useGetCustomers = () => {
  const [fetchedCustomers, setCustomers] = useState([]);

  const users = [];
  const fetchUsers = async () => {
    const q = query(collection(db, "customers"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        console.log(doc.data());
      });
      setCustomers(users);
    });
    console.log(fetchedCustomers);
    return fetchedCustomers;
  };

  return { fetchUsers, fetchedCustomers };
};
export default useGetCustomers;
