import { PackedEvent } from "@howljs/calendar-kit";
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
import { SaloonContext } from "../store/SaloonStore";
import { Meeting } from "../types";

const useFirebase = (
  selectedEvent: PackedEvent,
  pickedDate: string,
  data: Meeting
) => {
  const meetingsRef = doc(db, "meetings", `meetings`);
  const customersRef = doc(db, "customers", "customers");
  const ctx = useContext(MeetingsContext);
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const meetings = ctx.meetings;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const meetingsAtThisDay = meetings[selectedEvent?.day]?.filter(
    (el) => el.id !== selectedEvent.id
  );
  const makeFirebaseCall = async (type: string) => {
    setIsLoading(true);
    setError(null);
    if (type === "delete") {
      const customersData = {
        ...customers[selectedEvent.title],
        meetings: customers[selectedEvent.title].meetings.filter(
          (el: Meeting) => el.id !== selectedEvent.id
        ),
      };

      try {
        await updateDoc(meetingsRef, {
          [selectedEvent?.day]:
            meetingsAtThisDay.length === 0 ? deleteField() : meetingsAtThisDay,
        });
        await updateDoc(customersRef, {
          [selectedEvent.title]: customersData,
        });
      } catch (error) {
        setError(error);

        throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else if (type === "edit") {
      try {
        await updateDoc(meetingsRef, {
          [selectedEvent?.day]:
            meetingsAtThisDay.length === 0 ? deleteField() : meetingsAtThisDay,
        });
        const docSnap = await getDoc(meetingsRef);
        if (docSnap.exists()) {
          await updateDoc(meetingsRef, {
            [pickedDate]: arrayUnion(data),
          });
        } else {
          await setDoc(meetingsRef, {
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
