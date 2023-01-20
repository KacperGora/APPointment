import {
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../firebase/firebase";
import { MeetingsContext } from "../store/CalendarStore";

const useFirebase = (selectedEvent, pickedDate, data) => {
  const docRef = doc(db, "meetings", `meetings`);
  const ctx = useContext(MeetingsContext);
  const meetings = ctx.meetings;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const meetingsAtThisDay = meetings[selectedEvent.day]?.filter(
    (el) => el.id !== selectedEvent.id
  );
  const makeFirebaseCall = async (type: string) => {
    setIsLoading(true);
    setError(null);
    if (type === "delete") {
      try {
        await updateDoc(docRef, {
          [selectedEvent.day]:
            meetingsAtThisDay.length === 0 ? deleteField() : meetingsAtThisDay,
        });
      } catch (error) {
        setError(error);

        throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else if (type === "edit") {
      try {
        await updateDoc(docRef, {
          [selectedEvent.day]:
            meetingsAtThisDay.length === 0 ? deleteField() : meetingsAtThisDay,
        });
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            [pickedDate]: arrayUnion(data),
          });
        } else {
          await setDoc(docRef, {
            [pickedDate]: arrayUnion(data),
          });
        }
      } catch (error) {
        setError(error);
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    } 
  };
  return { makeFirebaseCall, isLoading, error };
};
export default useFirebase;
