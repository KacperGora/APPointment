import React, { useRef, useState } from "react";
import { View, Text, Animated, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { colors } from "../../../colors";
import CustomerModal from "../../../Customer modal/CustomerModal";
import PhoneLink from "../../../UI/Text/PhoneLink";
import { CustomerList, NewUserData } from "../../../../types";
import { AntDesign } from "@expo/vector-icons";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import Spinner from "../../../UI/Spinner/Spinner";
const CustomersList: React.FC<CustomerList> = ({
  customers,
  modalVisible,
  setModalVisible,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerPressed, setCustomerPressed] = useState<NewUserData>(null);
  const deleteIconPressHandler = async (customer: NewUserData) => {
    setShowModal(true);
    const docRef = doc(db, "customers", `customers`);
    setIsLoading(true);
    try {
      await updateDoc(docRef, {
        [customer.fullName]: deleteField(),
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const RightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
    customer: NewUserData
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [0.7, 0],
    });
    return (
      <>
        <TouchableOpacity onPress={() => deleteIconPressHandler(customer)}>
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: "#ffc6c4",
              justifyContent: "center",
              margin: 2,
              shadowColor: "lightgray",
              shadowOffset: { width: 2, height: 4 },
              shadowRadius: 2,
              borderRadius: 6,
              transform: [{ scale }],
            }}
          >
            <Animated.Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "600",
                transform: [{ scale }],
              }}
            >
              {isLoading ? (
                <Spinner borderWidth={1} size={20} />
              ) : (
                <AntDesign name="delete" size={24} color="black" />
              )}
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipeRef?.current?.close()}>
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: "#2e8b57",
              justifyContent: "center",
              margin: 2,
              shadowColor: "lightgray",
              shadowOffset: { width: 2, height: 4 },
              shadowRadius: 2,
              borderRadius: 6,
              transform: [{ scale }],
            }}
          >
            <Animated.Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "600",
                transform: [{ scale }],
              }}
            >
              <AntDesign name="edit" size={24} color="white" />
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
      </>
    );
  };

  const informationIconPressHandler = (customer: NewUserData) => {
    setModalVisible(true);
    setCustomerPressed(customer);
  };
  const swipeRef = useRef<Swipeable>();
  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={false}
        style={{ borderWidth: 10 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
          }}
        >
          <Text>AAAAAAAAAAAAAAAAAAAAAAA</Text>
        </View>
      </Modal>
      <DataTable style={{ flex: 1 }}>
        <DataTable.Header
          style={{
            backgroundColor: "#fafafae9",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <DataTable.Title>Imię Nazwisko</DataTable.Title>
          <DataTable.Title numeric>Numer Telefonu</DataTable.Title>
          <DataTable.Title numeric>Info</DataTable.Title>
        </DataTable.Header>
        <ScrollView style={{ flex: 1 }}>
          {Object.values(customers)?.map((customer: NewUserData) => (
            <Swipeable
              ref={swipeRef}
              shouldCancelWhenOutside
              key={customer.phoneNumber}
              renderRightActions={(progress, dragX) =>
                RightActions(progress, dragX, customer)
              }
            >
              <DataTable.Row>
                <DataTable.Cell>{customer.fullName}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <PhoneLink style={{}} phoneNumber={customer.phoneNumber} />
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Ionicons
                    name="md-information-circle-outline"
                    size={24}
                    color={colors.secondary}
                    onPress={() => informationIconPressHandler(customer)}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            </Swipeable>
          ))}
        </ScrollView>
      </DataTable>
      {modalVisible && (
        <CustomerModal
          item={customerPressed}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

export default CustomersList;
