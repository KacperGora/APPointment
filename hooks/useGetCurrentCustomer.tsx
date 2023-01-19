import { useContext } from "react";
import { SaloonContext } from "../store/SaloonStore";

const useGetCurrentCustomer = (customerName) => {
  const salonCtx = useContext(SaloonContext);
  const customers = salonCtx.customers;
  const customer = customers.filter((customer) =>
    customer.fullName.toLowerCase().includes(customerName.toLowerCase())
  );
  return customer[0];
};
export default useGetCurrentCustomer;
