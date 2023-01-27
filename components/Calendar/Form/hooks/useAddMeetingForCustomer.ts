import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { Meeting, NewUserData } from "../../../../types";

async function useAddMeetingForCustomer(customer: NewUserData, data: Meeting) {
  const customerRef = doc(db, "customers", "customers");
  const dirtyData = { ...customer };
  dirtyData.meetings.push(data);

  await updateDoc(customerRef, {
    [customer.fullName]: dirtyData,
  });
}
export default useAddMeetingForCustomer;
