import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { colors } from "../colors";
import { RowContainer, ScreenWidth } from "../shared";
import RegularText16 from "../UI/Text/RegularText";
import SmallText from "../UI/Text/SmallText";

const BottomSheetToolBar = ({
  editEventHandler,
  deleteEventHandler,
  data,
  editedEventDraft,
}) => {
  const icons = [
    {
      render: (
        <AntDesign
          key={1}
          name={!!editedEventDraft ? "checkcircleo" : "edit"}
          onPress={editEventHandler}
          color={!!editedEventDraft ? "green" : colors.greydark}
          size={24}
        />
      ),
    },
    {
      render: (
        <AntDesign
          key={2}
          name="delete"
          onPress={deleteEventHandler}
          color={!!editedEventDraft ? "red" : colors.greydark}
          size={24}
          style={{ marginLeft: 4, fontWeight: "bold" }}
        />
      ),
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: !!editedEventDraft ? "space-between" : "flex-end",
        alignItems: "center",
        padding: !!editEventHandler ? 12 : 0,
      }}
    >
      {!!editedEventDraft && (
        <RowContainer style={{ width: ScreenWidth * 0.7, padding: 6 }}>
          <View>
            <RegularText16>{data.customerName}</RegularText16>
            <SmallText>{data.serviceValue}</SmallText>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              marginHorizontal: 20,
            }}
          >
            <SmallText>
              {data.startHour} - {data.endHour}
            </SmallText>
            <SmallText textStyles={{ fontSize: 12 }}>
              {data.dateString}
            </SmallText>
          </View>
        </RowContainer>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: ScreenWidth / 5,
        }}
      >
        {icons.map((el) => {
          return el.render;
        })}
      </View>
    </View>
  );
};
export default BottomSheetToolBar;
