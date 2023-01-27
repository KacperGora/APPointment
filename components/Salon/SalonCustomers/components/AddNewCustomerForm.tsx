import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../../colors";
import { addNewCustomerFormConfiguration } from "./addNewCustomerFormConfiguration";
import { Ionicons } from "@expo/vector-icons";
import {
  validateFullName,
  validatePhoneNumber,
} from "../../../../Utils/validation/regexValidation";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Spinner from "../../../UI/Spinner/Spinner";
import RegularButton from "../../../UI/Buttons/RegularButton";
import { db } from "../../../../firebase/firebase";
type FormProps = {
  hideBottomModal?: () => void;
  customerName?: string;
};
const AddNewCustomerForm: React.FC<FormProps> = ({
  hideBottomModal,
  customerName,
}) => {
  const { inputConfig, additionalInfo, fullName, phoneNumber, resetInputs } =
    addNewCustomerFormConfiguration(customerName);
  const [isLoading, setIsLoading] = useState(false);
  const phoneIsValid = validatePhoneNumber(phoneNumber);

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
        const customerRef = doc(db, "customers", "customers");
        const docSnap = await getDoc(customerRef);
        if (docSnap.exists()) {
          await updateDoc(customerRef, {
            [userData.fullName]: userData,
          });
        } else {
          await setDoc(customerRef, {
            [userData.fullName]: userData,
          });
        }
        // await updateDoc(customerRef, {
        //   [userData.fullName]: userData,
        // });
      } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error(e);
      } finally {
        setIsLoading(false);
        hideBottomModal();
        resetInputs();
      }
    }
  };

  return (
    <>
      <Text style={styles.heading}>Dodaj nowego klienta</Text>
      {isLoading ? (
        <Spinner size={50} borderWidth={5} />
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
      <RegularButton
        btnStyles={{
          alignSelf: "center",
          width: "60%",
          marginVertical: 12,
          marginHorizontal: 24,
        }}
        textStyles={{ color: "white", fontWeight: "700", fontSize: 16 }}
        onPress={buttonPressHandler}
        title="DODAJ"
        primary
      />
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
