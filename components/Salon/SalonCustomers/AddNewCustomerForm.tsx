import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../colors";
import CustomButton from "../../UI/CustomButton";
import { addNewCustomerFormConfiguration } from "./addNewCustomerFormConfiguration";
import { Ionicons } from "@expo/vector-icons";
import {
  validateFullName,
  validatePhoneNumber,
} from "../../../Utils/validation/regexValidation";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import Spinner from "../../UI/Spinner/Spinner";
import { SaloonContext } from "../../../store/SaloonStore";

const AddNewCustomerForm = ({ hideBottomModal, customerName, meeting }) => {
  const { inputConfig, additionalInfo, fullName, phoneNumber, resetInputs } =
    addNewCustomerFormConfiguration(customerName);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const phoneIsValid = validatePhoneNumber(phoneNumber);
  const customerCtx = useContext(SaloonContext);
  const salonCtx = useContext(SaloonContext);

  const fullNameInputIsValid = validateFullName(fullName);
  const formIsValid = phoneIsValid && fullNameInputIsValid;
  const userData = {
    fullName,
    phoneNumber,
    additionalInfo,
    meetings: [],
    timeStamp: serverTimestamp(),
  };
  const buttonPressHandler = async () => {
    if (formIsValid) {
      try {
        setIsLoading(true);
        setError(false);
        customerCtx.addCustomers(userData);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
      hideBottomModal();
      resetInputs();
    } else {
      return;
    }
  };

  return (
    <>
      <Text style={styles.heading}>Dodaj nowego klienta</Text>

      {isLoading ? (
        <Spinner />
      ) : (
        <View>
          {inputConfig.map((input) => {
            return (
              <View key={input.id} style={styles.singleInputLine}>
                <Ionicons
                  name={input.icon}
                  size={24}
                  color={colors.secondary}
                  style={styles.icon}
                />
                <TextInput
                  placeholderTextColor={colors.gray}
                  style={styles.input}
                  placeholder={input.name}
                  keyboardType={input.keyboardType}
                  returnKeyType={input.returnKeyType}
                  autoCapitalize={input.autoCapitalize}
                  autoFocus={false}
                  ref={input.ref}
                  onSubmitEditing={input.onSubmitEditing}
                  onChangeText={input.onChange}
                  value={input.value}
                  maxLength={input.maxLength}
                />
              </View>
            );
          })}
        </View>
      )}

      <CustomButton disabled={!formIsValid} onPress={buttonPressHandler}>
        Dodaj
      </CustomButton>
    </>
  );
};

export default AddNewCustomerForm;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width - 10,
    backgroundColor: "white",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    alignItems: "center",
    padding: 24,
    margin: 24,
  },
  singleInputLine: {
    flexDirection: "row",
    margin: 12,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    padding: 12,
  },
  preInputText: {
    fontWeight: "600",
    width: 120,
    borderRightColor: "red",
    borderRightWidth: 1,
  },
  input: {
    color: "black",
    width: 190,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.greydark,
    opacity: 0.6,
    margin: 24,
  },
  icon: {
    paddingRight: 24,
  },
});
