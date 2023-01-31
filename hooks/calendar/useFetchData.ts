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
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const meetingsQuery = query(collection(db, "meetings"));
    const customersQuery = query(collection(db, "customers"));
    const unsubscribeMeetings = onSnapshot(
      meetingsQuery,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setEventsData(doc.data());
          setEventsFlatData(Object.values(doc.data()).flat());
        });

        setIsLoading(false);
      },
      (error) => {
        setError(error);
        throw new Error(error.message);
      }
    );
    const unsubscribeCustomers = onSnapshot(
      customersQuery,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCustomers(doc.data());
        });

        setIsLoading(false);
      },
      (error) => {
        setError(error);
        throw new Error(error.message);
      }
    );

    return () => {
      unsubscribeCustomers();
      unsubscribeMeetings();
    };
  }, []);

  return { eventsData, eventsFlatData, customers, error, isLoading };
};
export default useFetchData;
