export interface Meeting {
  name: string;
  lastName: string;
  startDayStr: string;
  startHourStr: string;
  startFullDate: Date;
  serviceName: string;
  endFullDate: Date;
  endHour: string;
  duration: number;
  excludedTimes: string[];
  start: any;
  end: any;
  title: any;
}

export interface AllMeetings {
  [date: string]: Meeting[];
}
export type MeetingContextProp = {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  removeMeeting: (id: number) => void;
};
