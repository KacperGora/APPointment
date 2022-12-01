import { useEffect, useState } from "react";

const useSetFontSizeForTimelineEvents = (calendarViewMode) => {
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    switch (calendarViewMode) {
      case "day":
        setFontSize(14);
        break;
      case "threeDays":
        setFontSize(10);
        break;
      case "workWeek":
        setFontSize(10);
        break;
      case "week":
        setFontSize(8);
        break;
      default:
        setFontSize(8);
        break;
    }
  }, [calendarViewMode]);
  return fontSize;
};

export default useSetFontSizeForTimelineEvents;
