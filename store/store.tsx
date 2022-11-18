import { CalendarViewMode, EventItem } from "@howljs/calendar-kit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { groupBy } from "lodash";
import React from "react";
import { useCallback, useState, useEffect } from "react";
import { CalendarUtils } from "react-native-calendars";
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
}

export const MeetingsContext = React.createContext<MeetingContextProps>({
  addMeeting: () => {},
  removeMeeting: () => {},
  meetings: {},
  timelineViewMode: "threeDays",
  changeTimeLineHandler: () => {},
  fetchMeetings: (data) => {},
});

const MeetingsProvider: React.FC<MeetingsProviderProps> = ({ children }) => {
  const [meetings, setMeetings] = useState<AllMeetings>([]);
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
      }
      // }
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
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
export default MeetingsProvider;
