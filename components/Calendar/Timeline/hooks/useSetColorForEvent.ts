import { useEffect, useState } from "react";
import { SelectiveOptions } from "../../../../types";

const useSetColorForEvent = (service: SelectiveOptions) => {
  const [color, setColor] = useState("red");

  useEffect(() => {
    switch (service?.value) {
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
