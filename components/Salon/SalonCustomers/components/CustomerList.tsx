import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import CustomerModal from "../../../Customer modal/CustomerModal";
import { CustomerList, NewUserData } from "../../../../types";
import CustomerSingleListItem from "./CustomerSingleListItem";
const CustomersList: React.FC<CustomerList> = ({
  customers,
  modalVisible,
  setModalVisible,
  onEditCustomerPress,
}) => {
  const [customerPressed, setCustomerPressed] = useState<NewUserData>(null);
  const tableHeaderConfig = [
    { value: "Imię Nazwisko", property: false, id: 1 },
    { value: "Numer telefonu", property: true, id: 2 },
    { value: "Informacje", property: true, id: 3 },
  ];

  return (
    <View style={{ flex: 1 }}>
      <DataTable style={{ flex: 1 }}>
        <DataTable.Header
          style={{
            backgroundColor: "#fafafae9",
          }}
        >
          {tableHeaderConfig.map((el) => {
            return (
              <DataTable.Title key={el.id} numeric={el.property}>
                {el.value}
              </DataTable.Title>
            );
          })}
        </DataTable.Header>
        <ScrollView>
          {Object.values(customers)?.map((customer: NewUserData) => (
            <CustomerSingleListItem
              customer={customer}
              key={customer.phoneNumber}
              setCustomerPressed={setCustomerPressed}
              setModalVisible={setModalVisible}
              onEditCustomerPress={onEditCustomerPress}
            />
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
