import { EventItem } from "@howljs/calendar-kit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase/firebase";
import useFetchData from "../hooks/calendar/useFetchData";
import { AllMeetings, Meeting } from "../types";

interface MeetingsProviderProps {
  children: React.ReactNode;
}
interface MeetingContextProps {
  addMeeting: (meeting: EventItem, pickedDate: string) => void;
  removeMeeting: (meetingId: number) => void;
  meetings: AllMeetings;
  isLoading: boolean;

  meetingsFlat: any[];
}

export const MeetingsContext = React.createContext<MeetingContextProps>({
  addMeeting: () => {},
  removeMeeting: () => {},
  meetings: {},
  isLoading: false,

  meetingsFlat: [],
});

const MeetingsProvider: React.FC<MeetingsProviderProps> = ({ children }) => {
  const { eventsData, eventsFlatData } = useFetchData();
  const [meetings, setMeetings] = useState({});
  const [meetingsFlat, setMeetingsFlat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMeetings(eventsData);
    setMeetingsFlat(eventsFlatData);
  }, [eventsFlatData, eventsData]);

  const addMeeting = async (newMeeting: Meeting, pickedDate: string) => {
    const newArr = { ...meetings };
    console.log(newArr);
    if (newArr[pickedDate]) {
      newArr[pickedDate] = [...newArr[pickedDate], newMeeting];
      setMeetings(newArr);
    } else {
      newArr[pickedDate] = [newMeeting];
      setMeetings({ ...newArr });
    }

    try {
      setIsLoading(true);
      const meetingsRef = doc(db, "meetings", "meetings");
      const docSnap = await getDoc(meetingsRef);
      if (docSnap.exists()) {
        await updateDoc(meetingsRef, {
          [pickedDate]: arrayUnion(newMeeting),
        });
      } else {
        await setDoc(meetingsRef, {
          [pickedDate]: arrayUnion(newMeeting),
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const removeMeeting = () => {};

  return (
    <MeetingsContext.Provider
      value={{
        addMeeting,
        removeMeeting,
        meetings,
        isLoading,
        meetingsFlat,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
export default MeetingsProvider;
