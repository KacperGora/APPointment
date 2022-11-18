import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { MeetingsContext } from "../../store/store";

const useGetEvents = () => {
  const ctx = useContext(MeetingsContext);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchedMeetings = [];
    const getData = async () => {
      const q = query(collection(db, "meetings"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          for (const [key, value] of Object.entries(doc.data())) {
            if (fetchedMeetings[doc.id]) {
              fetchedMeetings[doc.id] = [...value];
            } else {
              fetchedMeetings[doc.id] = [...value];
            }
          }
        });
        ctx.fetchMeetings(fetchedMeetings);
      });
    };
    getData();
    return () => controller.abort();
  }, [ctx.meetings]);
};
