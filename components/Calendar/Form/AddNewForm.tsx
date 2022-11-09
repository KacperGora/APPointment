import React, {
  FunctionComponent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../colors";
import Calendar from "../Calendar";
import calculateTimeOfEnd from "../../../Utils/calculateTimeOfEnd";
import { hours, servicesDetails } from "../../../data";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MeetingsContext } from "../../../store/store";
import MeetingDetails from "./MeetingDetails";
import ButtonBox from "./ButtonsBox";
import calculateEventDuration from "../../../Utils/calculateEventDuration";
import pickHandler from "../../../Utils/pickHandler";
import HoursComponent from "./Hours";

interface Props {
  date: string;
}

type RouteProps = {
  params: {
    date: {
      year: number;
      month: number;
      day: number;
      timestamp: number;
      dateString: string;
    };
  };
};
interface Navigate {
  navigate: (destination: string) => void;
}
const AddNewForm: FunctionComponent<Props> = () => {
  const ctx = useContext(MeetingsContext);

  const navigation = useNavigation<Navigate>();
  const route = useRoute<RouteProp<RouteProps>>();
  const dateString = route.params.date.dateString;

  const [pickedDate, setPickedDate] = useState(dateString);

  const [pickedHour, setPickedHour] = useState("");
  const [userTypedName, setUserTypedName] = useState("");
  const [userTypedLastName, setUserTypedLastName] = useState("");
  const [services, setServices] = useState(servicesDetails);
  const pickedService = services.filter((service) => service.isActive === true);

  const servicePressHandler = (index: number) => {
    pickHandler(index, services, setServices);
  };

  const fullDate = new Date(
    pickedDate.split("T")[0] + "T" + pickedHour + ":00.000Z"
  );

  const data = {
    start: pickedDate,
    end: pickedDate,
    title: userTypedName,
    name: userTypedName,
    lastName: userTypedLastName,
    startDayStr: pickedDate,
    startHourStr: pickedHour,
    startFullDate: fullDate,
    serviceName: pickedService[0]?.name,
    endFullDate: calculateTimeOfEnd(fullDate, pickedService[0]?.duration),
    endHour: calculateTimeOfEnd(
      fullDate,
      pickedService[0]?.duration
    ).toLocaleTimeString(),
    duration: pickedService[0]?.duration,
    excludedTimes: calculateEventDuration(pickedService[0]?.duration, fullDate),
  };

  const submitHandler = (e: any) => {
    ctx?.addMeeting(data, pickedDate.split("T")[0]);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView>
      <Calendar date={pickedDate} setNewDate={setPickedDate} />
      <Text>{new Date(pickedDate).toLocaleDateString()} </Text>
      <View style={{ height: 250 }}>
        <ScrollView style={[styles.hourBox]} horizontal={true}>
          <HoursComponent
            pickedDay={pickedDate}
            setPickedHour={setPickedHour}
          />
        </ScrollView>
        <View style={styles.serviceBox}>
          {services.map((service, index) => (
            <Pressable
              key={index}
              onPress={servicePressHandler.bind(this, index)}
              style={[
                styles.serviceContainer,
                service.isActive && styles.active,
              ]}
            >
              <Text style={styles.hour}>{service.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View>
        <View style={styles.inputBox}>
          <MaterialIcons
            name="account-circle"
            size={24}
            color={colors.primary}
          />
          <TextInput
            autoCapitalize="words"
            style={styles.input}
            placeholder="Imię"
            autoCorrect={true}
            onChangeText={setUserTypedName}
          />
          <TextInput
            autoCapitalize="characters"
            style={styles.input}
            placeholder="Nazwisko"
            onChangeText={setUserTypedLastName}
          />
        </View>
      </View>
      <MeetingDetails date={fullDate} service={pickedService[0]} />
      <ButtonBox onPress={submitHandler} />
    </SafeAreaView>
  );
};

export default AddNewForm;
const styles = StyleSheet.create({
  active: { backgroundColor: "#f954a4c5" },
  bigBox: {
    height: 50,
  },

  serviceContainer: {
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    padding: 4,
    borderColor: colors.primary,
    margin: 4,
    height: 50,
    width: 150,
  },
  serviceBox: {
    margin: 4,
    borderBottomWidth: 1,

    justifyContent: "space-around",
    borderBottomColor: "green",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    // backgroundColor: "#fcb8b8aa",
    margin: 6,
    padding: 12,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    height: 50,
  },
  hour: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  hourBox: {
    borderBottomWidth: 1,
    borderBottomColor: "purple",
    // height: 50,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    padding: 8,
    margin: 8,
    textAlign: "center",
    borderRadius: 5,
    width: "40%",
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
