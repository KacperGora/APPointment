import { useContext } from "react";
import { SaloonContext } from "../store/SaloonStore";
import { NewUserData, User } from "../types";

const useGetCurrentCustomer = (customerName: string): NewUserData => {
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const currCustomer: {} = Object.values(customers)?.filter(
    (customer: NewUserData) =>
      customer?.fullName?.toLowerCase().includes(customerName?.toLowerCase())
  )[0];

  return;
};
export default useGetCurrentCustomer;
