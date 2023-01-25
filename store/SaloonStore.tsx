import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase/firebase";
import useGetCustomers from "../hooks/Salon/useGetCustomers";
import { NewUserData } from "../types";
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
  customers: NewUserData[];
  addCustomers: (customer: NewUserData) => void;
  getCustomers: (data: NewUserData[]) => void;
}
export const SaloonContext = React.createContext<SaloonContextProps>({
  dailyTarget: 0,
  weeklyTarget: 0,
  monthlyTarget: 0,
  changeTargetHandler: (value: number, type: string) => {},
  unavailableHoursHandler: (data) => {},
  unavailableHours: {},
  customers: [],
  addCustomers: (customer) => {},
  getCustomers: (data) => {},
});

const SaloonProvider: React.FC<SaloonProviderProps> = ({ children }) => {
  const [dailyTarget, setDailyTarget] = useState<number>(500);
  const [weeklyTarget, setWeeklyTarget] = useState<number>(3000);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(8000);
  const [customers, setCustomers] = useState<NewUserData[]>([]);
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

  const addCustomers = async (data: NewUserData) => {
    const customerRef = await setDoc(doc(db, "customers", data.fullName), data);
  };
  const getCustomers = (data) => {
    setCustomers(data);
  };
  const { fetchedCustomers } = useGetCustomers();

  useEffect(() => {
    setCustomers(fetchedCustomers);
    console.log(fetchedCustomers);
  }, [fetchedCustomers]);
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
        addCustomers,
      }}
    >
      {children}
    </SaloonContext.Provider>
  );
};
export default SaloonProvider;
