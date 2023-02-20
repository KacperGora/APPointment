import { uniqueId } from "lodash";
import React, { useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import RightActions from "../../../SalonCustomers/components/ItemListRightActions";

const SpendingItem = ({ item }) => {
  const swipeRef = useRef();
  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={(progress, dragX) => (
        <RightActions progress={progress} dragX={dragX} swipeRef={swipeRef} />
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
  );
};
export default SpendingItem;
