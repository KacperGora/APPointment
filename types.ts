export interface Meeting {
  serviceDuration: number;
  worker: string;
  name: string;
  lastName: string;
  startDayStr: string;
  startHourStr: string;
  startFullDate: Date;
  serviceName: string;
  servicePrice: number;
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

export type RootStackParam = {
  Welcome: undefined;
  Timeline: undefined;
  Home: undefined;
  Add: {
    date: string;
  };
};
