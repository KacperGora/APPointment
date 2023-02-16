import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import useGetPercentage from "../../../hooks/Salon/useGetPercentage";
import useServiceCounter from "./hooks/useServiceCounter";

export function getCarouselBarChartData() {
  const { meetingsServiceThisWeek, meetingsServiceThisMonth } =
    useServiceCounter();
  const monthlyData = [
    meetingsServiceThisMonth["Manicure Klasyczny"] || 0,
    meetingsServiceThisMonth["Manicure Hybrydowy"] || 0,
    meetingsServiceThisMonth["Uzupełnienie żelowe"] || 0,
    meetingsServiceThisMonth["Przedłużenie paznokci żelem"] || 0,
    meetingsServiceThisMonth["Pedicure"] || 0,
  ];
  const weeklyData = [
    meetingsServiceThisWeek["Manicure Klasyczny"] || 0,
    meetingsServiceThisWeek["Manicure Hybrydowy"] || 0,
    meetingsServiceThisWeek["Uzupełnienie żelowe"] || 0,
    meetingsServiceThisWeek["Przedłużenie paznokci żelem"] || 0,
    meetingsServiceThisWeek["Pedicure"] || 0,
  ];

  const data: ChartData = {
    labels: ["Klasyczny", "Hybrydowy", "U. żelowe", "P. żelem", "Pedicure"],
    datasets: [
      {
        data: weeklyData,
      },
    ],
  };
  return [
    {
      title: "Miesiąc",
      datasets: monthlyData,
      labels: data.labels,
    },
    {
      title: "Tydzień",
      datasets: weeklyData,
      labels: data.labels,
    },
  ];
}
export function getCarouselRingChartData() {
  const {
    todayPercentage,
    weeklyPercentage,
    monthlyPercentage,
    thisMonthEarnings,
    todayEarnings,
    weeklyEarnings,
  } = useGetPercentage();

  return [
    {
      title: "Przychody",
      data: {
        todayPercentage,
        weeklyPercentage,
        monthlyPercentage,
        thisMonthEarnings,
        todayEarnings,
        weeklyEarnings,
      },
      iconName: "settings",
      navDestination: "Ustawienia",
    },
    {
      title: "Wydatki",
      data: {
        todayPercentage: 0.45,
        weeklyPercentage: 0.2,
        monthlyPercentage: 0.6,
        thisMonthEarnings: 20,
        todayEarnings: 40,
        weeklyEarnings: 60,
      },
      iconName: "add",
      navDestination: "Ustawienia",
    },
    {
      title: "Dochody",
      data: {
        todayPercentage: 0.15,
        weeklyPercentage: 0.78,
        monthlyPercentage: 0.22,
        thisMonthEarnings: 40,
        todayEarnings: 60,
        weeklyEarnings: 80,
      },
      iconName: "add",
      navDestination: "Wydatki",
    },
  ];
}
