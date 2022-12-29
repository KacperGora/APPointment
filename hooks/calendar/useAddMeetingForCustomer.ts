import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

async function useAddMeetingForCustomer(fullName, data) {
  const customerRef = doc(db, "customers", fullName);

  await updateDoc(customerRef, {
    meetings: arrayUnion(data),
  });
}
export default useAddMeetingForCustomer;
