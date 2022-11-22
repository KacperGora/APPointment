import React from "react";
import { Button, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const ManageServices = () => {
  return (
    <View>
      <TextInput placeholder="Imię" />
      <TextInput placeholder="Nazwisko" />
      <TextInput placeholder="Numer telefonu" />
      <TextInput placeholder="Uwagi" />
      <Button title="Dodaj" />
    </View>
  );
};

export default ManageServices;
