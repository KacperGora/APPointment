import {
  CalendarViewMode,
  EventItem,
  PackedEvent,
  TimelineCalendarHandle,
} from "@howljs/calendar-kit";
import { FieldValue } from "firebase/firestore";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Animated,
  FlexAlignType,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { TDaySelectionAnimation } from "react-native-calendar-strip";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
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
  height: number;
  name: string;
  day: string;
}

export type RouteProps = {
  params: {
    viewMode?: CalendarViewMode;
    date?: string;
    onCloseBottomSheet?: () => void;
    event?: PackedEvent;
  };
};
export interface AllMeetings {
  [title: string]: Meeting[];
}
export type MeetingContextProp = {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  removeMeeting: (id: number) => void;
};

export type SelectiveOptions = {
  value?: string;
  isActive?: boolean;
  duration?: number;
  price?: string;
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
  event?: Meeting;
};
export type Navigation = {
  navigate: (param: string, arg1?: NavigationParams) => void;
};
export type InputConfig = {
  id: number;
  editable: boolean;
  name: string;
  autoFocus: boolean;
  keyboardType: KeyboardTypeOptions;
  returnKeyType: ReturnKeyTypeOptions;
  value?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  icon: any;
  ref?: any;
  onSubmitEditing?: () => void;
  numberOfLines?: number;
  onChange?: (value) => void;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  maxLength?: number;
  multiline?: boolean;
  error?: boolean;
  errorText?: string;
}[];

export type NewCustomerConfigurationFnReturnedValue = {
  inputConfig: InputConfig;
  resetInputs: () => void;
  fullName: string;
  phoneNumber: string;
  additionalInfo: string;
};

export type AgendaProps = {
  isLoading: boolean;
};

export type NewUserData = {
  fullName: string;
  phoneNumber: string;
  additionalInfo?: string;
  meetings: Meeting[];
  timeStamp: FieldValue;
};
export type User = {
  [key: string]: NewUserData;
};
export type CustomerModalProps = {
  modalVisible: boolean;
  setModalVisible: any;
  item: NewUserData;
};
export type OpeningHours = {
  fullName: string;
  shortName: string;
  isActive: boolean;
  disabled: boolean;
  id: number;
  hours: {
    start: string;
    end: string;
  };
}[];
export type PickHandlerArgs = {
  index: number;
  array: SelectiveOptions[];
  SetState: any;
};
export type TimelineProps = {
  isLoading: boolean;
  calendarRef: React.MutableRefObject<TimelineCalendarHandle>;
  viewMode: CalendarViewMode;
  setBottomSheetActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setBottomSheetVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setBottomSheetDirtyDate: React.Dispatch<React.SetStateAction<string>>;
  events: EventItem[];
  selectedEvent: PackedEvent;
  setMonthName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedEvent: React.Dispatch<React.SetStateAction<PackedEvent>>;
  setEditedEventDraft: React.Dispatch<React.SetStateAction<PackedEvent>>;
  timelineHeaderShown: boolean;
  eventMoveHandler: () => void;
};

export type BottomSheetProps = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  children: ReactNode;
  onCloseBottomSheet?: () => void;
  editing?: boolean;
  oneSnap?: boolean;
};
export type AgendaDayProps = {
  nameDay: string;
  day: number;
  nameMonth: string;
  item: Meeting;
  fullDate: string;
};
export type AgendaItemProps = {
  item: Meeting;
  emptyWeeks?: any;
  fullDate?: any;
};

export type InputComponentProps = {
  data: any;
  direction: "row" | "column";
};
export type FormCalendarStripProps = {
  date: string;
  setNewDate: React.Dispatch<React.SetStateAction<string>>;
};
export type CalendarStripProps = {
  style: ViewStyle;
  calendarAnimation: { duration: number; type: "sequence" | "parallel" };
  daySelectionAnimation: TDaySelectionAnimation;
  calendarHeaderStyle: TextStyle;
  highlightDateContainerStyle: ViewStyle;
  dateNumberStyle: TextStyle;
  dateNameStyle: TextStyle;
  highlightDateNameStyle: TextStyle;
  highlightDateNumberStyle: TextStyle;
  disabledDateNameStyle: TextStyle;
  disabledDateNumberStyle: TextStyle;
};
export type MeetingDetailProps = {
  date?: Date;
  service?: SelectiveOptions;
  endHour?: string;
  worker?: string;
  submitHandler?: () => {};
  customerName?: string;
  children?: any;
  style?: ViewStyle;
  selectedEvent?: PackedEvent;
  editing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  editedEventDraft?: PackedEvent | Meeting;
  eventMove?: boolean;
  index?: number;
};
export type MeetingFormProps = {
  timelineDate: string;
  onCloseBottomSheet?: () => void;
  worker?: string;
  service?: any;
  customerName?: string;
  editing?: boolean;
  editedEventDraft?: any;
  selectedEvent?: any;
  setEditingFinished?: any;
  setIndexForm?: any;
};
export type BottomSheetSelectedEv = {
  selectedEvent: PackedEvent;
  editedEventDraft: PackedEvent;
  setSelectedEvent: React.Dispatch<React.SetStateAction<PackedEvent>>;
};

export type TimelineScreenHeaderProps = {
  calendarRef?: React.MutableRefObject<TimelineCalendarHandle>;
  monthName?: string;
  setTimelineHeaderShown?: React.Dispatch<React.SetStateAction<boolean>>;
  disableCalendar?: boolean;
  onTodayIconPressHandler: () => void;
  searchPressHandler?: (value: string) => void;
  disableSearchBar?: boolean;
};
export type NavbarProps = {
  monthName: string;
  onGestureStart: () => void;
  searchIconPressHandler: () => void;
  onTodayIconPressHandler: () => void;
  disableSearchBar: boolean;
  disableCalendar: boolean;
};
export type SearchBarProps = {
  setSearchBarVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  searchPressHandler?: (value: string) => void;
};
export type CustomerList = {
  customers?: {};
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onEditCustomerPress: (customer: NewUserData) => void;
};
export type FormSelectiveOptionsMapProps = {
  data: {
    id: number;
    render: boolean;
    data: SelectiveOptions[];
    pressHandler: () => void;
  }[];
};
export type AddNewCustomerProps = {
  hideBottomModal?: () => void;
  customerName?: string;
  setIndex?: React.Dispatch<SetStateAction<number>>;
  customerInEdition?: NewUserData;
  editing?: boolean;
};
export type RightActionArgs = {
  progress: Animated.AnimatedInterpolation;
  dragX: Animated.AnimatedInterpolation;
  customer?: NewUserData;
  onEdit?: any;
  swipeRef?: any;
};
export type ModalInformation = {
  item: NewUserData;
  onPress?: (destination: string, event: any) => void;
};
export type SpendingType = {
  name: string;
  value: number;
  type: "spending" | "income";
  date: string;
  folder: string;
};
