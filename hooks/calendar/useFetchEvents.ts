import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SectionListData } from "react-native";
import { db } from "../../firebase/firebase";
import { AllMeetings, Meeting } from "../../types";

const useFetchEvents = () => {
  const [data, setData] = useState<SectionListData<Meeting>[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchedMeetings = [];
    setError(null);
    const q = query(collection(db, "meetings"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          for (const [key, value] of Object.entries(doc.data())) {
            fetchedMeetings[doc.id] = [...value];
          }
        });
        setData(fetchedMeetings);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        console.log(error);
        throw new Error(error.message);
      }
    );

    return () => {
      unsubscribe;
    };
  }, []);

  return { data, error, isLoading };
};
export default useFetchEvents;
