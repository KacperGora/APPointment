import {
  DefaultSectionT,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  SectionListData,
  TextInputProps,
} from "react-native";

export interface Meeting {
  id: string;
  color: string;
  title: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  start: string;
  end: string;
  startHourStr: string;
  endHour: string;
  excludedTimes: string[];
  worker: string;
}

export interface AllMeetings {
  [title: string]: Meeting[];
}
export type MeetingContextProp = {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  removeMeeting: (id: number) => void;
};

export type Service = {
  value: string;
  isActive: boolean;
  duration: number;
  price: string;
};
export type WorkerDetails = {
  value: string;
  isActive: boolean;
};
export type Hours = {
  value: string;
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
export type NavigationParams = {
  date?: string;
};
export type Navigation = {
  navigate: (param: string, arg1?: NavigationParams) => void;
};
export type InputConfig = {
  id: number;
  name: string;
  autoFocus: boolean;
  keyboardType: KeyboardTypeOptions;
  returnKeyType: ReturnKeyTypeOptions;
  value?: string;
  icon: any;
  ref?: any;
  onSubmitEditing?: () => {};
  numberOfLines?: number;
  onChange?: (value) => void;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  maxLength?: number;
}[];

export type NewCustomerConfigurationFnReturnedValue = {
  inputConfig: InputConfig;
  resetInputs: () => void;
  fullName: string;
  phoneNumber: string;
  additionalInfo: string;
};

export type AgendaProps = {
  agendaEvents: SectionListData<Meeting, DefaultSectionT>[];
  isLoading: boolean;
};
