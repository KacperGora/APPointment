import { PackedEvent } from "@howljs/calendar-kit";
import {
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { filter, isEmpty } from "lodash";
import { useContext, useState } from "react";
import { db } from "../firebase/firebase";
import { MeetingsContext } from "../store/CalendarStore";
import { SaloonContext } from "../store/SaloonStore";
import { Meeting, NewUserData, SpendingType } from "../types";
import useFetchData from "./calendar/useFetchData";

type FirebaseCallType = "edit" | "delete" | "add";
const useFirebase = (
  firebasePath: "meetings" | "customers" | "salon settings",
  fireBaseCollection?: string
) => {
  const ref = doc(db, firebasePath, fireBaseCollection || firebasePath);
  const customerRef = doc(db, "customers", "customers");
  const spendingRef = doc(db, "salon settings", "spending");
  const meetingsRef = doc(db, "meetings", "meetings");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const ctx = useContext(MeetingsContext);
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.fetchedCustomers;
  const meetings = ctx.meetings;
  const { salonSpending } = useFetchData();

  const addDataHandler = async (data: Meeting & NewUserData & SpendingType) => {
    const customer: NewUserData = { ...customers[data.title] };

    !isEmpty(customer) && customer.meetings.push(data);
    const docSnap = await getDoc(ref);

    if (!!data.day) {
      docSnap.exists()
        ? await updateDoc(ref, {
            [data.day]: arrayUnion(data),
          })
        : await setDoc(ref, {
            [data.day]: arrayUnion(data),
          });
      !isEmpty(customer) &&
        (await updateDoc(customerRef, {
          [customer.fullName]: customer,
        }));
    } else if (!!data.fullName) {
      docSnap.exists()
        ? await updateDoc(ref, {
            [data.fullName]: data,
          })
        : await setDoc(ref, {
            [data.fullName]: data,
          });
    } else if (!!data.date) {
      docSnap.exists()
        ? await updateDoc(ref, {
            [data.folder]: arrayUnion(data),
          })
        : await setDoc(ref, {
            [data.folder]: arrayUnion(data),
          });
    }
  };
  const deleteDataHandler = async (
    data: PackedEvent & NewUserData & SpendingType
  ) => {
    if (!!data.day) {
      const meetingsAtThisDay = meetings[data?.day]?.filter(
        (el) => el.id !== data.id
      );
      await updateDoc(ref, {
        [data.day]:
          meetingsAtThisDay.length === 0 ? deleteField() : meetingsAtThisDay,
      });
      if (!!customers[data?.title]) {
        const customersData = {
          ...customers[data?.title],
          meetings: customers[data.title].meetings.filter(
            (el: Meeting) => el.id !== data.id
          ),
        };
        await updateDoc(customerRef, {
          [data.title]: customersData,
        });
      }
    } else if (!!data.fullName) {
      await updateDoc(ref, {
        [data.fullName]: deleteField(),
      });
    } else if (!!data.folder) {
      const customer: NewUserData = { ...customers[data.name] };
      const customerData: NewUserData = {
        ...customer,
        meetings: customer.meetings?.filter(
          (meeting) => meeting.id !== data.id
        ),
      };
      if (data.type === "spending") {
        const newData = [...salonSpending[data.folder]]?.filter(
          (spending) => spending.id !== data.id
        );
        await updateDoc(ref, {
          [data.folder]: newData.length === 0 ? deleteField() : newData,
        });
      } else if (data.type === "income") {
        const meetingRef = doc(db, "meetings", "meetings");
        const meetingsAtThisDay = meetings[data?.originFolder]?.filter(
          (el) => el.id !== data.id
        );
        await updateDoc(meetingRef, {
          [data.originFolder]:
            meetingsAtThisDay.length === 0 ? deleteField() : meetingsAtThisDay,
        });
        await updateDoc(customerRef, {
          [data.name]: customerData,
        });
      }
    }
  };

  const editDataHandler = async (
    data: PackedEvent & NewUserData & Meeting & SpendingType,
    date?: string
  ) => {
    if (!!data.meetings) {
      const dirtyData = { ...customers };
      dirtyData[data.fullName] = data;
      await updateDoc(customerRef, dirtyData);
    } else if (!!data.folder) {
      const dataCopy = { ...salonSpending };
      if (data.type === "spending") {
        dataCopy[data.folder].filter((el) => el.id !== data.id);
        const filteredCopy = dataCopy[data.folder].filter(
          (el) => el.id !== data.id
        );
        filteredCopy.push(data);
        dataCopy[data.folder] = filteredCopy;
        await updateDoc(ref, {
          [data.folder]: filteredCopy,
        });
      } else if (data.type === "income") {
        const editedMeeting = meetings[data.originFolder].filter(
          (el) => el.id === data.id
        )[0];
        console.log(meetings);
        editedMeeting.servicePrice = data.value;
        await updateDoc(meetingsRef, {
          [data.originFolder]: meetings[data.originFolder],
        });
      }
    } else {
      const dirtyData = { ...meetings };
      const filteredEvents = dirtyData[date]?.filter(
        (meeting) => meeting.id !== data.id
      );

      const customersData: NewUserData = {
        ...customers[data?.title],
        meetings: customers[data.title].meetings.filter(
          (el: PackedEvent) => el.id !== data.id
        ),
      };
      customersData.meetings.push(data);
      await updateDoc(ref, {
        [date]: filteredEvents?.length !== 0 ? filteredEvents : deleteField(),
      });
      await updateDoc(ref, {
        [data.day]: arrayUnion(data),
      });
      await updateDoc(customerRef, {
        [data.title]: customersData,
      });
    }
  };

  const makeFirebaseCall = async (
    callType: FirebaseCallType,
    data: any,
    date?: string
  ) => {
    setIsLoading(true);
    setShowSuccess(false);
    setError(null);
    try {
      callType === "add" && (await addDataHandler(data));
      callType === "delete" && (await deleteDataHandler(data));
      callType === "edit" && (await editDataHandler(data, date));
    } catch (error) {
      setError(error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
      setShowSuccess(true);
    }
  };

  return { makeFirebaseCall, isLoading, error };
};
export default useFirebase;
