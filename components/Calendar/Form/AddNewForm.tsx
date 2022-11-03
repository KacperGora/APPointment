import { FunctionComponent, useReducer, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../colors";
import Calendar from "../Calendar";
import CustomButton from "../../UI/CustomButton";
import calculateTimeOfEnd from "../../../Utils/calculateTimeOfEnd";
import { hours, servicesDetails } from "../../../data";
interface Props {
  date: string;
}

const AddNewForm: FunctionComponent<Props> = ({ date }) => {
  const [pickedDate, setPickedDate] = useState(date);

  const [userTypedName, setUserTypedName] = useState("");
  const [userTypedLastName, setUserTypedLastName] = useState("");
  const [services, setServices] = useState(servicesDetails);
  const pickedService = services.filter((service) => service.isActive === true);
  const [pickedHours, setPickedHour] = useState(hours);

  const servicePressHandler = (index: number) => {
    const newArr = [...services];
    const oldIndex = newArr.findIndex((service) => service.isActive);
    newArr[oldIndex] = {
      ...newArr[oldIndex],
      isActive: !newArr[oldIndex]?.isActive,
    };
    newArr[index] = {
      ...newArr[index],
      isActive: !newArr[index].isActive,
    };

    setServices(newArr);
  };
  const hourPressHandler = (index: number) => {
    const newArr = [...hours];
    newArr[index] = {
      ...newArr[index],
      isActive: !newArr[index].isActive,
    };
    setPickedHour(newArr);
  };
  const dayStr = date;
  const hourStr = pickedHours.filter((hour) => hour.isActive === true)[0]?.hour;
  const fullDate = new Date(dayStr + "T" + hourStr + ":00.000Z");

  const data = {
    name: userTypedName,
    lastName: userTypedLastName,
    startDayStr: dayStr,
    startHourStr: hourStr,
    startFullDate: fullDate,
    serviceName: pickedService[0]?.name,
    endFullDate: calculateTimeOfEnd(fullDate, pickedService[0]?.duration),
    endHour: calculateTimeOfEnd(
      fullDate,
      pickedService[0]?.duration
    ).toLocaleTimeString(),
    duration: pickedService[0]?.duration,
  };

  return (
    <SafeAreaView>
      <Calendar date={date} setNewDate={setPickedDate} />
      <Text>{new Date(pickedDate).toLocaleDateString()} </Text>
      <View style={{ height: 250 }}>
        <ScrollView style={[styles.hourBox]} horizontal={true}>
          {pickedHours.map((hour, index) => (
            <Pressable
              onPress={hourPressHandler.bind(this, index)}
              style={[styles.container, hour.isActive && styles.active]}
            >
              <Text style={styles.hour}>{hour.hour}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.serviceBox}>
          {services.map((service, index) => (
            <Pressable
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
      <CustomButton onPress={() => console.log(data)}>Dodaj</CustomButton>
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
