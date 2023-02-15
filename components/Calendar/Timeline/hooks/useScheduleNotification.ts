import { closestTo } from "date-fns";
import dayjs from "dayjs";
import * as Notifications from "expo-notifications";
import useFetchData from "../../../../hooks/calendar/useFetchData";
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

const useScheduleNotification = () => {
  const { eventsFlatData, eventsData } = useFetchData();
  const datesArray = eventsFlatData
    .map((el) => dayjs(el.start).toDate())
    .filter((date) => date.valueOf() > new Date().valueOf());
  const closestMeetingDate = closestTo(new Date(), datesArray);
  const closestMeeting = eventsFlatData.filter(
    (el) =>
      dayjs(el.start).toISOString() === dayjs(closestMeetingDate).toISOString()
  )[0];
  // const todaySortedMeetings = eventsData[dayjs().format("YYYY-MM-DD")]?.sort(
  //   (a, b) => a.endHour.localeCompare(b.endHour)
  // );
  // const lastMeeting = todaySortedMeetings[todaySortedMeetings?.length - 1];

  const scheduleNotificationHandlerIncomingEvent = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: closestMeeting?.title,
        body: `${closestMeeting?.serviceName} - ${closestMeeting?.startHourStr}`,
        data: { userName: "Kacper" },
        vibrate: [10, 50, 250],
      },
      trigger: {
        day: dayjs(closestMeeting?.start).subtract(30, "minutes").get("date"),
        month:
          dayjs(closestMeeting?.start).subtract(30, "minutes").get("M") + 1,
        hour: dayjs(closestMeeting?.start).subtract(30, "minutes").get("hour"),
        minute: dayjs(closestMeeting?.start)
          .subtract(30, "minutes")
          .get("minute"),
      },
    });
  };
  const scheduleNotificationHandlerDailyReport = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Wygeneruj raport dzienny",
        body: `Jesteś już po pracy!`,
        data: { userName: "Kacper" },
        vibrate: [10, 50, 250],
      },
      trigger: {
        seconds: 5,
      },
    });
  };
  return {
    scheduleNotificationHandlerIncomingEvent,
    scheduleNotificationHandlerDailyReport,
  };
};
export default useScheduleNotification;
