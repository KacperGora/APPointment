import React, { useEffect } from "react";
import { useState } from "react";
import useFetchData from "../hooks/calendar/useFetchData";
interface SaloonProviderProps {
  children: React.ReactNode;
}
interface SaloonContextProps {
  dailyTarget: number;
  weeklyTarget: number;
  monthlyTarget: number;

  unavailableHours: {};
  unavailableHoursHandler: (data) => void;
  fetchedCustomers: {};
}
export const SaloonContext = React.createContext<SaloonContextProps>({
  dailyTarget: 0,
  weeklyTarget: 0,
  monthlyTarget: 0,

  unavailableHoursHandler: (data) => {},
  unavailableHours: {},
  fetchedCustomers: {},
});

const SaloonProvider: React.FC<SaloonProviderProps> = ({ children }) => {
  const { salonSettings, customers } = useFetchData();
  const [dailyTarget, setDailyTarget] = useState<number>(0);
  const [weeklyTarget, setWeeklyTarget] = useState<number>(0);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(0);
  const [fetchedCustomers, setFetchedCustomers] = useState({});

  useEffect(() => {
    setDailyTarget(salonSettings.targets?.dailyTargets);
    setWeeklyTarget(salonSettings.targets?.weeklyTargets);
    setMonthlyTarget(salonSettings.targets?.monthlyTargets);
  }, [salonSettings.targets]);
  useEffect(() => {
    setFetchedCustomers(customers);
  }, [customers]);

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
        fetchedCustomers,
      }}
    >
      {children}
    </SaloonContext.Provider>
  );
};
export default SaloonProvider;
