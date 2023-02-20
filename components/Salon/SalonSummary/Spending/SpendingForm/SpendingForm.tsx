import React, { useState } from "react";
import { View } from "react-native";
import TextInputs from "../../../../Calendar/Form/components/NewMeetingTextInputs/NewMeetingTextInputs";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RegularText24 from "../../../../UI/Text/RegularText24";
import { Checkbox } from "react-native-paper";
import { ScreenWidth } from "../../../../shared";
import RegularButton from "../../../../UI/Buttons/RegularButton";
import SmallText from "../../../../UI/Text/SmallText";
import useFirebase from "../../../../../hooks/useFirebase";
import { useGetSpendingFormConfig } from "../config/spendingConfig";

const SpendingForm = ({ onSubmit }) => {
  const [date, setDate] = useState(new Date());
  const { data, inputsData } = useGetSpendingFormConfig(date);
  const [status, setStatus] = useState("unchecked");
  const { makeFirebaseCall } = useFirebase("salon settings", "spending");

  const checkBoxPressHandler = () => {
    setStatus(status === "unchecked" ? "checked" : "unchecked");
  };
  const submitSpendingHandler = () => {
    makeFirebaseCall("add", data);
    onSubmit();
  };

  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 24,
          margin: 12,
          borderColor: "lightgray",
          shadowColor: "gray",
          shadowOffset: { width: 2, height: 4 },
          shadowRadius: 6,
          shadowOpacity: 0.3,
          backgroundColor: "white",
        }}
      >
        <View style={{ margin: 6 }}>
          <RegularText24>Dodaj koszty</RegularText24>
        </View>
        {/* <KeyboardAwareScrollView> */}
        <View
          style={{
            width: ScreenWidth / 1.3,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <TextInputs data={inputsData} direction="column" />
        </View>

        <View
          style={{
            marginVertical: 12,
            marginHorizontal: 24,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <SmallText>Data: </SmallText>
          <RNDateTimePicker
            mode="date"
            value={date}
            onChange={(d, e) => {
              setDate(e);
            }}
            display="compact"
            locale="pl-PL"
            themeVariant="light"
            style={{
              width: 100,
            }}
          />
        </View>
        <View
          style={{
            marginVertical: 12,
            marginHorizontal: 24,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <SmallText>Płatność cykliczna?</SmallText>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#876016",
              borderRadius: 50,
              marginLeft: 12,
            }}
          >
            <Checkbox
              status={status}
              onPress={checkBoxPressHandler}
              color="black"
            />
          </View>
        </View>
        <RegularButton
          onPress={submitSpendingHandler}
          title="Dodaj"
          primary
          textStyles={{ color: "white" }}
          btnStyles={{ width: ScreenWidth / 2, alignSelf: "center" }}
        />
        {/* </KeyboardAwareScrollView> */}
      </View>
    </View>
  );
};

export default SpendingForm;
