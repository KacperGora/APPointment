import React, { useEffect, useState } from "react";
import { RowContainerSpaceBetween } from "../../shared";
import SearchBar from "./components/Searchbar/SearchBar";
import Navbar from "./components/Navbar";
import CalendarListComponent from "./components/CalendarList/CalendarListComponent";
type TimelineScreenHeaderProps = {
  calendarRef?: any;
  monthName?: any;
  setTimelineHeaderShown?: any;
  disableCalendar?: boolean;
  onTodayIconPressHandler: () => void;
};
const TimelineScreenHeader: React.FC<TimelineScreenHeaderProps> = ({
  calendarRef,
  monthName,
  setTimelineHeaderShown,
  disableCalendar,
  onTodayIconPressHandler,
}) => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [calendarListVisible, setCalendarListVisible] = useState(false);
  const searchIconPressHandler = () => {
    setSearchBarVisible(true);
  };
  const onGestureStartHandler = () => {
    setCalendarListVisible((currState) => !currState);
  };
  useEffect(() => {
    setTimelineHeaderShown && setTimelineHeaderShown(!calendarListVisible);
  }, [calendarListVisible]);

  const calendarRenderCondition = calendarListVisible && !disableCalendar;

  return (
    <>
      <RowContainerSpaceBetween style={{ paddingHorizontal: 12 }}>
        {searchBarVisible ? (
          <SearchBar
            searchIconPressHandler={searchIconPressHandler}
            setSearchBarVisible={setSearchBarVisible}
          />
        ) : (
          <Navbar
            monthName={monthName}
            searchIconPressHandler={searchIconPressHandler}
            onGestureStart={onGestureStartHandler}
            onTodayIconPressHandler={onTodayIconPressHandler}
          />
        )}
      </RowContainerSpaceBetween>
      {calendarRenderCondition ? (
        <CalendarListComponent calendarRef={calendarRef} />
      ) : null}
    </>
  );
};

export default TimelineScreenHeader;
