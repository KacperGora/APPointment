import { useEffect, useState } from "react";

type Service = {
  name: string;
  isActive: boolean;
  duration: number;
  price: string;
};
const useSetColorForEvent = (service: Service) => {
  const [color, setColor] = useState("red");

  useEffect(() => {
    switch (service?.name) {
      case "Manicure Klasyczny":
        setColor("#A9DEF9");
        break;
      case "Manicure Hybrydowy":
        setColor("#D0F4DE");
        break;
      case "Uzupełnienie żelowe":
        setColor("#E4C1F9");
        break;
      case "Przedłużenie paznokci żelem":
        setColor("#FCF6BD");
        break;
      case "Pedicure":
        setColor("#EE4266");
    }
  }, [service]);
  return color;
};

export default useSetColorForEvent;

export const servicesDetails = [
  {
    name: "Manicure Klasyczny",
    isActive: false,
    duration: 90,
    price: "40PLN",
  },
  {
    name: "Manicure Hybrydowy",
    isActive: false,
    duration: 120,
    price: "80PLN",
  },
  {
    name: "Uzupełnienie żelowe",
    isActive: false,
    duration: 150,
    price: "120PLN",
  },
  {
    name: "Przedłużenie paznokci żelem",
    isActive: false,
    duration: 180,
    price: "140PLN",
  },
  { name: "Pedicure", isActive: false, duration: 60, price: "120PLN" },
];
