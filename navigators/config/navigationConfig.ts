import ManageServicesScreen from "../../screens/Settings/ManageServicesScreen";
import ManageTargetsScreen from "../../screens/Settings/ManageTargetsScreen";
import ManageUnavailableHoursScreen from "../../screens/Settings/ManageUnavailableHoursScreen";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import LandingScreen from "../../screens/LandingScreen";
import RootTab, { CalendarDrawerNav, SalonDrawerNav } from "../RootTab";
import SalonCustomersScreen from "../../screens/Saloon/SalonCustomersScreen";
import SalonSummaryScreen from "../../screens/Saloon/SalonSummaryScreen";
import SettingsDrawerNavigation from "../SettingsDrawerNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import AgendaComponent from "../../components/Calendar/Agenda";
import Timeline from "../../components/Calendar/Timeline";
import { CalendarViewMode } from "@howljs/calendar-kit";
import { AgendaProps } from "../../types";
import { FC } from "react";
import SalonSummary from "../../components/Salon/SalonSummary/SalonSummary";
import SpendingComponent from "../../components/Salon/SalonSummary/Spending";

type screenProps = {
  id: number;
  name: string;
  component: (() => JSX.Element) | FC<AgendaProps>;
  iconFamily: any;
  iconName: any;
  viewMode?: CalendarViewMode;
}[];
export function getDrawerNavigationScreens() {
  const drawerScreens: screenProps = [
    {
      id: 1,
      name: "Targety",
      component: ManageTargetsScreen,
      iconFamily: Feather,
      iconName: "target",
    },
    {
      id: 2,
      name: "Usługi",
      component: ManageServicesScreen,
      iconFamily: MaterialCommunityIcons,
      iconName: "offer",
    },
    {
      id: 3,
      name: "Godziny",
      component: ManageUnavailableHoursScreen,
      iconFamily: Ionicons,
      iconName: "ios-hourglass",
    },
  ];
  return drawerScreens;
}

export function getStackNavigationScreens() {
  const stackScreens = [
    {
      id: 1,
      name: "Welcome",
      component: LandingScreen,
    },
    {
      id: 2,
      name: "Home",
      component: RootTab,
    },
  ];
  return stackScreens;
}

export function getTabNavigationScreens() {
  const tabScreens: screenProps = [
    {
      id: 1,
      name: "Wizyty",
      component: CalendarDrawerNav,
      iconFamily: Ionicons,
      iconName: "calendar-outline",
    },
    {
      id: 2,
      name: "Klienci",
      component: SalonCustomersScreen,
      iconFamily: Ionicons,
      iconName: "people",
    },
    {
      id: 3,
      name: "Analizy",
      component: SalonDrawerNav,
      iconFamily: MaterialCommunityIcons,
      iconName: "google-analytics",
    },
    {
      id: 4,
      name: "Ustawienia",
      component: SettingsDrawerNavigation,
      iconFamily: Ionicons,
      iconName: "settings",
    },
  ];
  return tabScreens;
}
export function getSalonDrawerNavigation() {
  const drawerSalonScreens = [
    {
      id: 1,
      name: "Podsumowanie",
      component: SalonSummaryScreen,
      iconFamily: MaterialCommunityIcons,
      iconName: "abacus",
    },
    {
      id: 2,
      name: "Rozliczenie",
      component: SpendingComponent,
      iconFamily: MaterialCommunityIcons,
      iconName: "cash-fast",
    },
  ];
  return drawerSalonScreens;
}
export function getCalendarDrawerNavigation() {
  const drawerCalendarScreens: screenProps = [
    {
      id: 1,
      name: "Tydzień",
      component: Timeline,
      iconFamily: MaterialCommunityIcons,
      iconName: "calendar-week",
      viewMode: "week",
    },
    {
      id: 2,
      name: "Dni pracujące",
      component: Timeline,
      iconFamily: MaterialCommunityIcons,
      iconName: "calendar-weekend",
      viewMode: "workWeek",
    },
    {
      id: 3,
      name: "Trzy dni",
      component: Timeline,
      iconFamily: MaterialIcons,
      iconName: "view-week",
      viewMode: "threeDays",
    },
    {
      id: 4,
      name: "Dzień",
      component: Timeline,
      iconFamily: MaterialIcons,
      iconName: "calendar-view-day",
      viewMode: "day",
    },
    {
      id: 4,
      name: "Harmonogram",
      component: AgendaComponent,
      iconFamily: MaterialCommunityIcons,
      iconName: "view-agenda-outline",
      viewMode: undefined,
    },
  ];
  return drawerCalendarScreens;
}
