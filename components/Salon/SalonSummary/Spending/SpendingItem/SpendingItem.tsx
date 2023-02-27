import { uniqueId } from "lodash";
import React, { useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import useFirebase from "../../../../../hooks/useFirebase";
import RightActions from "../../../../UI/SwipeRightActions/ItemListRightActions";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import RegularText16 from "../../../../UI/Text/RegularText";
import RegularButton from "../../../../UI/Buttons/RegularButton";
import { RowContainer } from "../../../../shared";
import Modal from "react-native-modal";
const SpendingItem = ({ item, setEditing }) => {
  const [showModal, setShowModal] = useState(false);
  const swipeRef = useRef<Swipeable>();
  const { makeFirebaseCall, isLoading } = useFirebase(
    "salon settings",
    "spending"
  );

  const deleteIconPressHandler = async (item) => {
    makeFirebaseCall("delete", item);
    swipeRef.current.close();
    setShowModal(false);
  };
  const listRightActionsConfig = [
    {
      id: 1,
      onPress: () => setShowModal(true),
      icon: <AntDesign name="delete" size={24} color="black" />,
      backgroundColorContainer: "#ffc6c4",
    },
    {
      id: 2,
      onPress: () => {
        setEditing(item);
        swipeRef.current.close();
      },
      icon: <AntDesign name="edit" size={24} color="white" />,
      backgroundColorContainer: "#2e8b57",
    },
  ];

  return (
    <>
      <Swipeable
        ref={swipeRef}
        renderRightActions={(progress, dragX) => (
          <RightActions
            progress={progress}
            dragX={dragX}
            swipeRef={swipeRef}
            data={listRightActionsConfig}
          />
        )}
      >
        <DataTable.Row key={uniqueId()}>
          <DataTable.Cell>{item.date}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 2 }}>{item.name}</DataTable.Cell>
          <DataTable.Cell>
            {item.type === "income" ? "+ " : "- "}
            {item.value} PLN
          </DataTable.Cell>
        </DataTable.Row>
      </Swipeable>
      <Modal
        isVisible={showModal}
        animationIn={"fadeIn"}
        onBackdropPress={() => {
          setShowModal(false);
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
          }}
        >
          <RegularText16>Czy chcesz usunąć te wydarzenie?</RegularText16>
          <RowContainer style={{ marginVertical: 24 }}>
            <RegularButton
              btnStyles={{ borderWidth: 1, marginHorizontal: 4 }}
              title="Anuluj"
              onPress={() => setShowModal(false)}
            />
            <RegularButton
              title="Akcpetuj"
              primary
              textStyles={{ color: "white" }}
              onPress={() => deleteIconPressHandler(item)}
            />
          </RowContainer>
        </View>
      </Modal>
    </>
  );
};
export default SpendingItem;
