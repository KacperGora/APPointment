import { CalendarViewMode, EventItem } from "@howljs/calendar-kit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";
import { AllMeetings, Meeting } from "../types";

interface MeetingsProviderProps {
  children: React.ReactNode;
}
interface MeetingContextProps {
  addMeeting: (meeting: EventItem, pickedDate: string) => void;
  removeMeeting: (meetingId: number) => void;
  meetings: AllMeetings;
  timelineViewMode: CalendarViewMode;
  changeTimeLineHandler: (value) => void;
  fetchMeetings: (data) => void;
  isLoading: boolean;
}

export const MeetingsContext = React.createContext<MeetingContextProps>({
  addMeeting: () => {},
  removeMeeting: () => {},
  meetings: {},
  timelineViewMode: "threeDays",
  changeTimeLineHandler: () => {},
  fetchMeetings: (data) => {},
  isLoading: false,
});

const MeetingsProvider: React.FC<MeetingsProviderProps> = ({ children }) => {
  const [meetings, setMeetings] = useState<AllMeetings>({});
  const [isLoading, setIsLoading] = useState(false);
  const [timelineViewMode, setTimeLineViewMode] =
    useState<CalendarViewMode>("threeDays");
  const changeTimeLineHandler = (value) => {
    setTimeLineViewMode(value);
  };

  const addMeeting = useCallback(
    async (newMeeting: Meeting, pickedDate: string) => {
      const newArr = meetings;
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
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const removeMeeting = () => {};
  const fetchMeetings = (data) => {
    setMeetings(data);
  };

  return (
    <MeetingsContext.Provider
      value={{
        addMeeting,
        removeMeeting,
        meetings,
        timelineViewMode,
        changeTimeLineHandler,
        fetchMeetings,
        isLoading,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
export default MeetingsProvider;
