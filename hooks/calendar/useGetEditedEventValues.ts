import { differenceInMinutes } from "date-fns";
import dayjs from "dayjs";
import { Meeting } from "../../types";
import getEventExcludedTimes from "../../Utils/getEventExcludedTimes";

const useGetEditedEventValues = (editedEventDraft: Meeting) => {
  editedEventDraft.day = dayjs(editedEventDraft?.start).format("YYYY-MM-DD");
  editedEventDraft.startHourStr = dayjs(editedEventDraft?.start).format(
    "HH:mm"
  );
  editedEventDraft.endHour = dayjs(editedEventDraft?.end).format("HH:mm");
  const calculateDraggedEventDuration = differenceInMinutes(
    dayjs(editedEventDraft.end).toDate(),
    dayjs(editedEventDraft.start).toDate()
  );
  editedEventDraft.excludedTimes = getEventExcludedTimes(
    calculateDraggedEventDuration,
    dayjs(editedEventDraft.start).toDate()
  );
  return editedEventDraft;
};

export default useGetEditedEventValues;
