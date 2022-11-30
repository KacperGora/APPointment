import { AgendaList } from "react-native-calendars";
import React, { useCallback } from "react";

import { StyleSheet, View } from "react-native";
import Spinner from "../../UI/Spinner/Spinner";
import NoEventsAgenda from "./NoItemsScreen";
import { AgendaProps, Meeting } from "../../../types";

import AgendaItem from "./AgendaItem/AgendaItem";
import NoItemsScreen from "./NoItemsScreen";

const Agenda: React.FC<AgendaProps> = ({ agendaEvents, isLoading }) => {
  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <View
      style={[
        styles.container,
        agendaEvents.length > 0 && { alignItems: "stretch" },
      ]}
    >
      {agendaEvents.length !== 0 ? (
        <AgendaList
          sections={agendaEvents}
          renderItem={renderItem}
          scrollToNextEvent={agendaEvents.length > 0 ? true : false}
          dayFormat={"dd.MM.yyyy"}
          avoidDateUpdates={false}
        />
      ) : (
        <NoItemsScreen
          heading={"Nie masz żadnych spotkań"}
          description={"Dotknij tutaj aby je dodać"}
          noAgendaEvents
        />
      )}
      {isLoading ? <Spinner /> : null}
    </View>
  );
};
export default Agenda;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
