import React, { useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import { TimelineScreenHeaderProps } from "../../../../types";
import { RowContainer } from "../../../shared";
import GestureDetectorComponent from "../../GestureDetectorComponent/GestureDetectorComponent";
import CalendarListComponent from "./components/CalendarList/CalendarListComponent";
import Navbar from "./components/Navbar";
import SearchBar from "./components/Searchbar/SearchBar";

const TimelineScreenHeader: React.FC<TimelineScreenHeaderProps> = ({
  calendarRef,
  monthName,
  setTimelineHeaderShown,
  disableCalendar,
  onTodayIconPressHandler,
  searchPressHandler,
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
      <RowContainer style={{ marginHorizontal: 16, backgroundColor: "white" }}>
        <GestureDetectorComponent onGestureStartHandler={onGestureStartHandler}>
          {searchBarVisible ? (
            <SearchBar
              setSearchBarVisible={setSearchBarVisible}
              searchPressHandler={searchPressHandler}
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
        </GestureDetectorComponent>
      </RowContainer>
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
