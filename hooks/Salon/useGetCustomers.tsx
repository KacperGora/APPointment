import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

const useGetCustomers = () => {
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const q = query(collection(db, "customers"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => setUsers(doc.data()));
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        throw new Error(error.message);
      }
    );
    return () => {
      unsubscribe;
    };
  }, []);
  return { users, error, isLoading };
};
export default useGetCustomers;
