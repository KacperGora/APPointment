export interface Meeting {
  worker: string;
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

  id: string;
  start: string;
  end: string;
  title: string;
  color: string;
}

export interface AllMeetings {
  [date: string]: Meeting[];
}
export type MeetingContextProp = {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  removeMeeting: (id: number) => void;
};

export type Service = {
  name: string;
  isActive: boolean;
  duration: number;
  price: string;
}[];

export type Hours = {
  hour: string;
  isActive: boolean;
};
