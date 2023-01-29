import React, { SetStateAction, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../../colors";
import { addNewCustomerFormConfiguration } from "./addNewCustomerFormConfiguration";
import { Ionicons } from "@expo/vector-icons";
import { HelperText, TextInput as TextInputPaper } from "react-native-paper";
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
import { RowContainer } from "../../../shared";
import RegularText24 from "../../../UI/Text/RegularText24";
import Animation from "../../../UI/SuccessAnimation/Animation";

type FormProps = {
  hideBottomModal?: () => void;
  customerName?: string;
  setIndex: React.Dispatch<SetStateAction<number>>;
};
const AddNewCustomerForm: React.FC<FormProps> = ({
  hideBottomModal,
  customerName,
  setIndex,
}) => {
  const { inputConfig, additionalInfo, fullName, phoneNumber, resetInputs } =
    addNewCustomerFormConfiguration(customerName);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
    setIndex(0);
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
      } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error(e);
      } finally {
        LayoutAnimation.easeInEaseOut();
        setIsLoading(false);
        setShowSuccess(true);
        setTimeout(() => {
          hideBottomModal();
          resetInputs();
        }, 1500);
      }
    }
  };
  const animationProgress = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={{ marginVertical: 0, marginHorizontal: 24 }}>
      {isLoading ? (
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Spinner size={50} borderWidth={5} />
        </View>
      ) : (
        <View style={{ marginTop: 24 }}>
          {showSuccess ? (
            <Animation />
          ) : (
            <>
              <RegularText24>Dodaj nowego klienta</RegularText24>
              {inputConfig.map((input) => {
                return (
                  <RowContainer
                    key={input.id}
                    style={{ marginVertical: 12, alignItems: "center" }}
                  >
                    <Ionicons
                      name={input.icon}
                      size={24}
                      color="gray"
                      style={styles.icon}
                    />
                    <View style={{ flex: 1 }}>
                      <TextInputPaper
                        mode="outlined"
                        placeholderTextColor="#9d9d9d"
                        ref={input.ref}
                        style={{
                          flex: 1,
                          paddingLeft: 24,
                          backgroundColor: "white",
                        }}
                        outlineColor="lightgray"
                        activeOutlineColor="#f764ab52"
                        textAlign="center"
                        value={input.value}
                        label={input.name}
                        key={input.id}
                        autoCapitalize={input.autoCapitalize}
                        returnKeyType={input.returnKeyType}
                        onChangeText={input.onChange}
                        keyboardType={input.keyboardType}
                        maxLength={input.maxLength}
                        multiline={input.multiline}
                        error={input.error}
                        onSubmitEditing={input.onSubmitEditing}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                      />
                      {input.error && (
                        <HelperText type="error" visible={input.error}>
                          {input.errorText}
                        </HelperText>
                      )}
                    </View>
                  </RowContainer>
                );
              })}
              <RegularButton
                btnStyles={{
                  alignSelf: "center",
                  width: "60%",
                  marginVertical: 12,
                  marginHorizontal: 24,
                }}
                textStyles={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 16,
                }}
                onPress={buttonPressHandler}
                title="DODAJ"
                primary
                disabled={!formIsValid}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default AddNewCustomerForm;
const styles = StyleSheet.create({
  singleInputLine: {
    flexDirection: "row",
    marginVertical: 12,
    alignItems: "center",
  },

  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.greydark,
    opacity: 0.6,
    margin: 24,
  },
  icon: {
    position: "relative",
    left: 30,
    zIndex: 3,
  },
});
