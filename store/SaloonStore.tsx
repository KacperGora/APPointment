import React from "react";
import { useState } from "react";
interface SaloonProviderProps {
  children: React.ReactNode;
}
interface SaloonContextProps {
  dailyTarget: number;
  weeklyTarget: number;
  monthlyTarget: number;
  changeTargetHandler: (value: number, type: string) => void;
  unavailableHours: {};
  unavailableHoursHandler: (data) => void;
  customers: {};

  getCustomers: (data) => void;
}
export const SaloonContext = React.createContext<SaloonContextProps>({
  dailyTarget: 0,
  weeklyTarget: 0,
  monthlyTarget: 0,
  changeTargetHandler: (value: number, type: string) => {},
  unavailableHoursHandler: (data) => {},
  unavailableHours: {},
  customers: [],

  getCustomers: (data) => {},
});

const SaloonProvider: React.FC<SaloonProviderProps> = ({ children }) => {
  const [dailyTarget, setDailyTarget] = useState<number>(500);
  const [weeklyTarget, setWeeklyTarget] = useState<number>(3000);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(8000);
  const [customers, setCustomers] = useState({});
  const [unavailableHours, setUnavailableHours] = useState({
    0: [
      { start: 0, end: 7 },
      { start: 18, end: 24 },
    ],
    1: [
      { start: 0, end: 7 },
      { start: 18, end: 24 },
    ],
    2: [
      { start: 0, end: 7 },
      { start: 18, end: 24 },
    ],
    3: [
      { start: 0, end: 7 },
      { start: 18, end: 24 },
    ],
    4: [
      { start: 0, end: 7 },
      { start: 18, end: 24 },
    ],
    5: [
      { start: 0, end: 7 },
      { start: 18, end: 24 },
    ],
    6: [{ start: 0, end: 24 }],
  });

  const getCustomers = (data) => {
    setCustomers(data);
  };

  const changeTargetHandler = async (value: number, type: string) => {
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
  const unavailableHoursHandler = (data) => {
    setUnavailableHours(data);
  };
  return (
    <SaloonContext.Provider
      value={{
        unavailableHoursHandler,
        unavailableHours,
        dailyTarget,
        weeklyTarget,
        monthlyTarget,
        changeTargetHandler,
        customers,
        getCustomers,
      }}
    >
      {children}
    </SaloonContext.Provider>
  );
};
export default SaloonProvider;
