import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Meeting } from "../../types";

const useFetchEvents = () => {
  const [data, setData] = useState({});
  const [flatData, setFlatData] = useState<Meeting[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const q = query(collection(db, "meetings"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setData(doc.data());
          setFlatData(Object.values(doc.data()).flat());
        });

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

  return { data, flatData, error, isLoading };
};
export default useFetchEvents;
//  const [data, setData] = useState({});
//  const [flatData, setFlatData] = useState<Meeting[]>([]);
//  const [error, setError] = useState(null);
//  const [isLoading, setIsLoading] = useState(true);
//  useEffect(() => {
//    setIsLoading(true);
//    setError(null);
//    const q = query(collection(db, "meetings"));
//    const unsubscribe = onSnapshot(
//      q,
//      (querySnapshot) => {
//        querySnapshot.forEach((doc) => {
//          setData(doc.data());
//          setFlatData(Object.values(doc.data()).flat());
//        });

//        setIsLoading(false);
//      },
//      (error) => {
//        setError(error);
//        throw new Error(error.message);
//      }
//    );
//    return () => {
//      unsubscribe;
//    };
//  }, []);