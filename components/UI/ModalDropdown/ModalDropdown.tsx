import React, { useState } from "react";
import ModalDropdown from "react-native-modal-dropdown";

const ModalDropdownComponent = ({ data, setHandler }) => {
  const labels = data.map((el) => el.label);
  const onSelectHandler = (e: any, val: any) => {
    setHandler(data.filter((el) => el.label === val)[0].value);
  };

  return (
    <ModalDropdown
      onSelect={onSelectHandler}
      options={labels}
      defaultValue={labels[0]}
    />
  );
};

export default ModalDropdownComponent;
