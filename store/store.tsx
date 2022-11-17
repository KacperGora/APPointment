import { CalendarViewMode, EventItem } from "@howljs/calendar-kit";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
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
}

export const MeetingsContext = React.createContext<MeetingContextProps>({
  addMeeting: () => {},
  removeMeeting: () => {},
  meetings: {},
  timelineViewMode: "threeDays",
  changeTimeLineHandler: () => {},
});

const MeetingsProvider: React.FC<MeetingsProviderProps> = ({ children }) => {
  const [meetings, setMeetings] = useState<AllMeetings>([]);
  const [timelineViewMode, setTimeLineViewMode] =
    useState<CalendarViewMode>("threeDays");
  const changeTimeLineHandler = (value) => {
    setTimeLineViewMode(value);
  };

  const addMeeting = useCallback((newMeeting: Meeting, pickedDate: string) => {
    console.log(typeof newMeeting);
    console.log(newMeeting);
    const newArr = meetings;
    if (newArr[pickedDate]) {
      newArr[pickedDate] = [...newArr[pickedDate], newMeeting];
      setMeetings(newArr);
    } else {
      newArr[pickedDate] = [newMeeting];
      setMeetings({ ...newArr });
    }
    // for (const [key, value] of Object.entries(newArr)) {
    try {
      const docRef = setDoc(doc(db, "meetings", pickedDate), {
        meetings: arrayUnion(...meetings[pickedDate] ,newMeeting),
      });
      // console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // }
  }, []);

  const removeMeeting = () => {};

  return (
    <MeetingsContext.Provider
      value={{
        addMeeting,
        removeMeeting,
        meetings,
        timelineViewMode,
        changeTimeLineHandler,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
export default MeetingsProvider;
