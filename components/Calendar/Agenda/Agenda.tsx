import { AgendaList } from "react-native-calendars";
import React, { useCallback } from "react";
import AgendaItem from "./AgendaListItem";
import { StyleSheet, Text, View } from "react-native";
import Spinner from "../../UI/Spinner/Spinner";

const Agenda = ({ agendaEvents, isLoading }) => {
  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <View style={styles.container}>
      {agendaEvents[0] && (
        <AgendaList
          style={{ backgroundColor: "white" }}
          sections={agendaEvents}
          renderItem={renderItem}
          scrollToNextEvent={agendaEvents.length > 0 ? true : false}
          dayFormat={"dd.MM.yyyy"}
          avoidDateUpdates={false}
        />
      )}
      {!agendaEvents[0] && !isLoading && <Text>Nie masz żadnych spotkań</Text>}
      {isLoading && <Spinner />}
    </View>
  );
};
export default Agenda;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
