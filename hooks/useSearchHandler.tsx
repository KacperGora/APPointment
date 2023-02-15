import useFetchData from "./calendar/useFetchData";
import { NewUserData } from "../types";

const useSearchHandler = (origin: "customers" | "events") => {
  const { eventsFlatData, isLoading, customers } = useFetchData();

  function searchFn(searchedValue: string) {
    const searchStr = searchedValue?.toLowerCase();
    if (origin === "events") {
      const filteredEventsData = eventsFlatData.filter((value) => {
        const serviceNameMatches = value.serviceName
          .toLowerCase()
          .includes(searchStr);
        const titleMatches = value.title
          .toString()
          .toLocaleLowerCase()
          .includes(searchStr);
        const idMatches = value.id
          .toString()
          .toLocaleLowerCase()
          .includes(searchStr);

        return serviceNameMatches || titleMatches || idMatches;
      });
      return filteredEventsData;
    } else {
      return Object.values(customers).filter((el: NewUserData) =>
        el.fullName.toLowerCase().includes(searchStr)
      );
    }
  }

  return { searchFn };
};
export default useSearchHandler;
