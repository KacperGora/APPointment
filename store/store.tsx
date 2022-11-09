import { groupBy } from "lodash";
import React from "react";
import { useCallback, useState, useEffect } from "react";
import { CalendarUtils } from "react-native-calendars";
import { AllMeetings, Meeting } from "../types";

interface MeetingsProviderProps {
  children: React.ReactNode;
}
interface MeetingContextProps {
  addMeeting: (meeting: Meeting, pickedDate: string) => void;
  removeMeeting: (meetingId: number) => void;
  meetings: AllMeetings;
}

export const MeetingsContext = React.createContext<MeetingContextProps>({
  addMeeting: () => {},
  removeMeeting: () => {},
  meetings: {},
});

const MeetingsProvider: React.FC<MeetingsProviderProps> = ({ children }) => {
  const [meetings, setMeetings] = useState<AllMeetings>([]);

  useEffect(() => {
    const meetingsByDate = groupBy(meetings, (e) =>
      CalendarUtils.getCalendarDateString(e)
    );

    setMeetings(meetingsByDate);
  }, []);

  const addMeeting = useCallback((newMeeting: Meeting, pickedDate: string) => {
    const newArr = meetings;
    if (newArr[pickedDate]) {
      newArr[pickedDate] = [...newArr[pickedDate], newMeeting];
      setMeetings(newArr);
    } else {
      newArr[pickedDate] = [newMeeting];
      setMeetings({ ...newArr });
    }
  }, []);

  const removeMeeting = () => {};

  return (
    <MeetingsContext.Provider
      value={{
        addMeeting,
        removeMeeting,
        meetings,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
export default MeetingsProvider;
