import { PackedEvent } from "@howljs/calendar-kit";
import {
  arrayUnion,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { isEmpty } from "lodash";
import { useContext, useState } from "react";
import { db } from "../firebase/firebase";
import { MeetingsContext } from "../store/CalendarStore";
import { SaloonContext } from "../store/SaloonStore";
import { Meeting, NewUserData } from "../types";
import Animation from "../components/UI/SuccessAnimation/Animation";
import React from "react";
import dayjs from "dayjs";

type FirebaseCallType = "edit" | "delete" | "add";
const useFirebase = (firebasePath: "meetings" | "customers") => {
  const ref = doc(db, firebasePath, firebasePath);
  const customerRef = doc(db, "customers", "customers");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const ctx = useContext(MeetingsContext);
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const meetings = ctx.meetings;

  const addDataHandler = async (data: Meeting & NewUserData) => {
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
    }
  };
  const deleteDataHandler = async (data: PackedEvent & NewUserData) => {
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
    }
  };

  const editDataHandler = async (
    data: PackedEvent & NewUserData & Meeting,
    date?: string
  ) => {
    if (!!data.meetings) {
      const dirtyData = { ...customers };
      dirtyData[data.fullName] = data;
      await updateDoc(customerRef, dirtyData);
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
