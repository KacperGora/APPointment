import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SectionListData,
} from "react-native";
import RegularButton from "../../Buttons/RegularButton";
import { colors } from "../../colors";
import { MaterialIcons } from "@expo/vector-icons";
import { MeetingsContext } from "../../../store/CalendarStore";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { Meeting } from "../../../types";
import Spinner from "../../UI/Spinner/Spinner";

const ErrorComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SectionListData<Meeting>[]>([]);
  const ctx = useContext(MeetingsContext);
  const fetchAgainEvents = () => {
    setIsLoading(true);
    const fetchedMeetings = [];

    const q = query(collection(db, "meetings"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          for (const [key, value] of Object.entries(doc.data())) {
            fetchedMeetings[doc.id] = [...value];
          }
        });
        setData(fetchedMeetings);
        setIsLoading(false);
      },
      (error) => {
        throw new Error(error.message);
      }
    );
  };

  useEffect(() => {
    ctx.fetchMeetings(data);
  }, [data, ctx.meetings]);

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Coś poszło nie tak</Text>
      <Text style={styles.errorTextDetail}>
        Sprawdź połączenie z internetem lub
      </Text>
      {isLoading ? (
        <Spinner />
      ) : (
        <RegularButton
          btnStyles={{
            alignSelf: "center",
            margin: 24,
            width: 200,
          }}
          textStyles={{ color: colors.white }}
          onPress={fetchAgainEvents}
        >
          <View />
          <MaterialIcons name="replay" size={24} color="white" />
        </RegularButton>
      )}
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: Dimensions.get("screen").width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  errorText: {
    fontSize: 24,
  },
  errorTextDetail: {
    fontSize: 12,
    marginVertical: 12,
    color: colors.greydark,
  },
});
