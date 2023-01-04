import { CalendarViewMode, EventItem } from "@howljs/calendar-kit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";
import useFetchEvents from "../hooks/calendar/useFetchEvents";
import { AllMeetings, Meeting } from "../types";

interface MeetingsProviderProps {
  children: React.ReactNode;
}
interface MeetingContextProps {
  addMeeting: (meeting: EventItem, pickedDate: string) => void;
  removeMeeting: (meetingId: number) => void;
  meetings: AllMeetings;
  isLoading: boolean;
  setMeetings: React.Dispatch<React.SetStateAction<AllMeetings>>;
}

export const MeetingsContext = React.createContext<MeetingContextProps>({
  addMeeting: () => {},
  removeMeeting: () => {},
  meetings: {},
  isLoading: false,
  setMeetings: () => {},
});

const MeetingsProvider: React.FC<MeetingsProviderProps> = ({ children }) => {
  const { flatData, data } = useFetchEvents();
  const [meetings, setMeetings] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMeetings(data);
  }, [data]);

  const addMeeting = async (newMeeting: Meeting, pickedDate: string) => {
    const newArr = { ...meetings };
    if (newArr[pickedDate]) {
      newArr[pickedDate] = [...newArr[pickedDate], newMeeting];
      setMeetings(newArr);
    } else {
      newArr[pickedDate] = [newMeeting];
      setMeetings({ ...newArr });
    }
    try {
      setIsLoading(true);
      const meetingsRef = doc(db, "meetings", pickedDate);
      const docSnap = await getDoc(meetingsRef);
      if (docSnap.exists()) {
        await updateDoc(meetingsRef, {
          meetings: arrayUnion(...meetings[pickedDate], newMeeting),
        });
      } else {
        setDoc(doc(db, "meetings", pickedDate), {
          meetings: [newMeeting],
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error(e);
    } finally {
      setIsLoading(false);
    }
    console.log(isLoading);
  };

  const removeMeeting = () => {};

  return (
    <MeetingsContext.Provider
      value={{
        addMeeting,
        removeMeeting,
        meetings,
        isLoading,
        setMeetings,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
export default MeetingsProvider;
