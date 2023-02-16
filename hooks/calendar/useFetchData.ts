import {
  collection,
  DocumentData,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Meeting } from "../../types";
type SalonTargets = {
  [key: string]: {
    dailyTargets: number;
    weeklyTargets: number;
    monthlyTargets: number;
  };
};
type SpendingType = {
  [key: string]: {
    name: string;
    value: number;
    type: "spending" | "income";
    date: string;
    folder: string;
  }[];
};
const useFetchData = () => {
  const [eventsData, setEventsData] = useState<{ [key: string]: Meeting[] }>(
    {}
  );
  const [eventsFlatData, setEventsFlatData] = useState<Meeting[]>([]);
  const [customers, setCustomers] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [salonSettings, setSalonSettings] = useState<SalonTargets>({});
  const [salonSpending, setSalonSpending] = useState<SpendingType>({});
  const meetingsQuery = query(collection(db, "meetings"));
  const customersQuery = query(collection(db, "customers"));
  const salonSettingsQuery = query(collection(db, "salon settings"));

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
      });
      onSnapshot(salonSettingsQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const salonSettings = {};

          doc.id !== "spending"
            ? (salonSettings[doc.id] = doc.data())
            : setSalonSpending(doc.data());

          setSalonSettings(salonSettings);
        });
      });

      setIsLoading(false);
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

  return {
    eventsData,
    eventsFlatData,
    customers,
    error,
    isLoading,
    salonSettings,
    salonSpending,
  };
};
export default useFetchData;
