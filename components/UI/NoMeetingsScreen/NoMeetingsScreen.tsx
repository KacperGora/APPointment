import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../../types";
type NoItemsScreenProps = {
  heading: string;
  description: string;
  noAgendaEvents?: boolean;
  destination?: string;
};
const NoMeetingsScreen: React.FC<NoItemsScreenProps> = ({
  heading,
  description,
  noAgendaEvents,
  destination,
}) => {
  const navigation = useNavigation<Navigation>();
  const pressHandler = () => {
    navigation.navigate(destination);
  };
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: 100,
        backgroundColor: "white",
      }}
    >
      <Pressable
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed && { opacity: 0.4 },
        ]}
        onPress={pressHandler}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.text}>{heading}</Text>
          <Text style={styles.textDetail}>{description}</Text>
          {noAgendaEvents ? (
            <View style={styles.icon}>
              <Ionicons
                name="add"
                size={32}
                color="white"
                style={{ fontWeight: "700" }}
              />
            </View>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
};

export default NoMeetingsScreen;

const styles = StyleSheet.create({
  pressableContainer: {
    alignItems: "center",
    flex: 1,
  },

  text: {
    fontSize: 24,
    letterSpacing: 1.2,
    color: "gray",
    textAlign: "center",
  },
  textDetail: {
    fontSize: 18,
    color: "lightgray",
    letterSpacing: 1.1,
    textAlign: "center",
    marginVertical: 12,
  },
  icon: {
    alignSelf: "center",
    backgroundColor: "#ec368e6a",
    borderColor: "#ec368e6a",
    borderRadius: 50,
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
  },
});
