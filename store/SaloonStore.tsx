import { CalendarViewMode, EventItem } from "@howljs/calendar-kit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";
import { AllMeetings, Meeting } from "../types";
interface SaloonProviderProps {
  children: React.ReactNode;
}
interface SaloonContextProps {
  dailyTarget: number;
  weeklyTarget: number;
  monthlyTarget: number;
  changeTargetHandler: (value: number, type: string) => void;
}
export const SaloonContext = React.createContext<SaloonContextProps>({
  dailyTarget: 0,
  weeklyTarget: 0,
  monthlyTarget: 0,
  changeTargetHandler: (value: number, type: string) => {},
});

const SaloonProvider: React.FC<SaloonProviderProps> = ({ children }) => {
  const [dailyTarget, setDailyTarget] = useState<number>(500);
  const [weeklyTarget, setWeeklyTarget] = useState<number>(1500);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(600);

  const changeTargetHandler = (value: number, type: string) => {
    switch (type) {
      case "daily": {
        setDailyTarget(value);
        break;
      }
      case "weekly": {
        setWeeklyTarget(value);
        break;
      }
      case "monthly": {
        setMonthlyTarget(value);
      }
    }
  };
  return (
    <SaloonContext.Provider
      value={{
        dailyTarget,
        weeklyTarget,
        monthlyTarget,
        changeTargetHandler,
      }}
    >
      {children}
    </SaloonContext.Provider>
  );
};
export default SaloonProvider;
