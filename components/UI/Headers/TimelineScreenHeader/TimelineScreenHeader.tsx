import React, { useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { RowContainerSpaceBetween } from "../../../shared";
import CalendarListComponent from "./components/CalendarList/CalendarListComponent";
import Navbar from "./components/Navbar";
import SearchBar from "./components/Searchbar/SearchBar";

type TimelineScreenHeaderProps = {
  calendarRef?: any;
  monthName?: any;
  setTimelineHeaderShown?: any;
  disableCalendar?: boolean;
  onTodayIconPressHandler: () => void;
  setSearchedEvents?: any;
  disableSearchBar?: boolean;
};
const TimelineScreenHeader: React.FC<TimelineScreenHeaderProps> = ({
  calendarRef,
  monthName,
  setTimelineHeaderShown,
  disableCalendar,

  onTodayIconPressHandler,
  setSearchedEvents,
  disableSearchBar,
}) => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [calendarListVisible, setCalendarListVisible] = useState(false);
  const searchIconPressHandler = () => {
    LayoutAnimation.easeInEaseOut();
    setSearchBarVisible(true);
  };
  const onGestureStartHandler = () => {
    LayoutAnimation.easeInEaseOut();
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
            setSearchBarVisible={setSearchBarVisible}
            setSearchedEvents={setSearchedEvents}
          />
        ) : (
          <Navbar
            monthName={monthName}
            searchIconPressHandler={searchIconPressHandler}
            onGestureStart={onGestureStartHandler}
            onTodayIconPressHandler={onTodayIconPressHandler}
            disableSearchBar={disableSearchBar}
            disableCalendar={disableCalendar}
          />
        )}
      </RowContainerSpaceBetween>
      {calendarRenderCondition ? (
        <CalendarListComponent
          calendarRef={calendarRef}
          onGestureStartHandler={onGestureStartHandler}
        />
      ) : null}
    </>
  );
};

export default TimelineScreenHeader;
