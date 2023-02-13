import { closestTo } from "date-fns";
import dayjs from "dayjs";
import * as Notifications from "expo-notifications";
import useFetchData from "../../../../hooks/calendar/useFetchData";
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const useScheduleNotification = () => {
  const { eventsFlatData } = useFetchData();
  const datesArray = eventsFlatData
    .map((el) => dayjs(el.start).toDate())
    .filter((date) => date.valueOf() > new Date().valueOf());
  const closestMeetingDate = closestTo(new Date(), datesArray);
  const closestMeeting = eventsFlatData.filter(
    (el) =>
      dayjs(el.start).toISOString() === dayjs(closestMeetingDate).toISOString()
  );

  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: closestMeeting[0]?.title,
        body: `${closestMeeting[0]?.serviceName} - ${closestMeeting[0]?.startHourStr}`,
        data: { userName: "Kacper" },
        vibrate: [10, 50, 250],
      },
      trigger: {
        hour: dayjs(closestMeeting[0]?.start)
          .subtract(30, "minutes")
          .get("hour"),
        minute: dayjs(closestMeeting[0]?.start)
          .subtract(30, "minutes")
          .get("minute"),
      },
    });
  };
  return { scheduleNotificationHandler };
};
export default useScheduleNotification;
