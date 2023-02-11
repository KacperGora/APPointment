import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { LayoutAnimation, View } from "react-native";
import { addNewCustomerFormConfiguration } from "./addNewCustomerFormConfiguration";
import { Ionicons } from "@expo/vector-icons";
import { HelperText, TextInput as TextInputPaper } from "react-native-paper";
import {
  validateFullName,
  validatePhoneNumber,
} from "../../../../Utils/validation/regexValidation";
import { serverTimestamp } from "firebase/firestore";
import Spinner from "../../../UI/Spinner/Spinner";
import RegularButton from "../../../UI/Buttons/RegularButton";
import { RowContainer } from "../../../shared";
import RegularText24 from "../../../UI/Text/RegularText24";
import Animation from "../../../UI/SuccessAnimation/Animation";
import useFirebase from "../../../../hooks/useFirebase";
import { AddNewCustomerProps, NewUserData } from "../../../../types";
import { SaloonContext } from "../../../../store/SaloonStore";

const AddNewCustomerForm: React.FC<AddNewCustomerProps> = ({
  hideBottomModal,
  setIndex,
  customerInEdition,
  editing,
}) => {
  const { inputConfig, additionalInfo, fullName, phoneNumber, resetInputs } =
    addNewCustomerFormConfiguration(customerInEdition, editing);
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
  const { isLoading, error, makeFirebaseCall } = useFirebase("customers");
  const newCustomerInEditionData: NewUserData = {
    ...customerInEdition,
    additionalInfo: userData.additionalInfo,
    phoneNumber: userData.phoneNumber,
  };
  const addCustomerButtonPressHandler = async () => {
    formIsValid && makeFirebaseCall(editing ? "edit" : "add", editing? newCustomerInEditionData : userData);
    !error && setShowSuccess(true);
  };
  useEffect(() => {
    showSuccess &&
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        hideBottomModal();
        resetInputs();
      }, 2500);
  }, [showSuccess]);

  return (
    <View style={{ marginVertical: 0, marginHorizontal: 24 }}>
      {isLoading ? (
        <Spinner size={50} borderWidth={5} />
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
                    <View style={{ flex: 1 }}>
                      <Ionicons
                        name={input.icon}
                        size={24}
                        color="gray"
                        style={{
                          position: "absolute",
                          left: 10,
                          zIndex: 3,
                          top: 15,
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <TextInputPaper
                          editable={input.editable}
                          mode="outlined"
                          placeholderTextColor="#9d9d9d"
                          ref={input.ref}
                          style={{
                            paddingLeft: 24,
                            backgroundColor: input.editable
                              ? "white"
                              : "#eaeaea7d",
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
                  shadowColor: "lightgray",
                  shadowOffset: { width: 2, height: 4 },
                  shadowRadius: 5,
                }}
                textStyles={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 16,
                }}
                onPress={addCustomerButtonPressHandler}
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
