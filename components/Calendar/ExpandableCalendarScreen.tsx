import React, { useRef, useCallback } from "react";
import { StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import testIDs from "./testIds";
import { agendaItems, getMarkedDates } from "../mocks/agendaItems";
import AgendaItem from "../mocks/AgendaItem";
import { getTheme, themeColor, lightThemeColor } from "../mocks/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateData } from "../mocks/types";
import { LocaleConfig } from "react-native-calendars";
import { UpdateSources } from "react-native-calendars/src/expandableCalendar/commons";

LocaleConfig.locales["pl"] = {
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: [
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paź",
    "Lis",
    "Gru",
  ],
  dayNames: [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ],
  dayNamesShort: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"],
  today: "Dziś",
};
LocaleConfig.defaultLocale = "pl";
const ITEMS: any[] = agendaItems;

interface Props {
  weekView?: boolean;
}

const ExpandableCalendarScreen = (props: Props) => {
  const navigate = useNavigation();

  const { weekView } = props;
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });
  console.log(ITEMS[0].title);
  const onDateChanged = useCallback(
    (date: string, updateSource: UpdateSources) => {
      console.log(
        "ExpandableCalendarScreen onDateChanged: ",
        date,
        updateSource
      );
    },
    []
  );

  const onMonthChange = useCallback((dateString: DateData) => {
    console.log("ExpandableCalendarScreen onMonthChange: ", dateString);
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);
  const dayLongPressHandler = (date: DateData) => {
    console.log(date);
    navigate.navigate("Add", { ...date });
  };
  return (
    <SafeAreaView>
      <CalendarProvider
        date={ITEMS[1]?.title}
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        showTodayButton
        disabledOpacity={0.5}
        theme={todayBtnTheme.current}
      >
        {weekView ? (
          <WeekCalendar
            testID={testIDs.weekCalendar.CONTAINER}
            firstDay={1}
            markedDates={marked.current}
          />
        ) : (
          <ExpandableCalendar
            testID={testIDs.expandableCalendar.CONTAINER}
            hideArrows
            onDayPress={(e: DateData) => console.log(e + "asdas")}
            onDayLongPress={dayLongPressHandler}
            // disablePan
            // hideKnob
            initialPosition={ExpandableCalendar.positions.OPEN}
            calendarStyle={styles.calendar}
            theme={theme.current}
            disableAllTouchEventsForDisabledDays
            firstDay={0}
            markedDates={marked.current}
            animateScroll
            closeOnDayPress={true}
            disabledDaysIndexes={[6]}
          />
        )}
        <AgendaList
          onTouchStart={(e) => console.log(e)}
          sections={ITEMS}
          renderItem={renderItem}
          scrollToNextEvent
          sectionStyle={styles.section}
          dayFormat={"dd.MM.yyyy"}
        />
      </CalendarProvider>
    </SafeAreaView>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: "lightgrey",
  },
  section: {
    backgroundColor: lightThemeColor,
    color: "grey",
    textTransform: "capitalize",
  },
});
