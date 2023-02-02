import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Meeting } from "../../types";

const useFetchData = () => {
  const [eventsData, setEventsData] = useState({});
  const [eventsFlatData, setEventsFlatData] = useState<Meeting[]>([]);
  const [customers, setCustomers] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const meetingsQuery = query(collection(db, "meetings"));
  const customersQuery = query(collection(db, "customers"));

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);
    try {
      onSnapshot(meetingsQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setEventsData(doc.data());
          setEventsFlatData(Object.values(doc.data()).flat());
        });
      });
      onSnapshot(customersQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCustomers(doc.data());
        });
        setIsLoading(false);
      });
    } catch (error) {
      setError(error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
    return () => {
      abortController.abort();
    };
  }, []);

  return { eventsData, eventsFlatData, customers, error, isLoading };
};
export default useFetchData;
