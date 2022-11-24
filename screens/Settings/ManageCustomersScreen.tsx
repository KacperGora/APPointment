import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddNewCustomerForm from "../../components/Settings/Customers/AddNewCustomerForm";


const ManageCustomersScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <AddNewCustomerForm />
    </SafeAreaView>
  );
};

export default ManageCustomersScreen;
