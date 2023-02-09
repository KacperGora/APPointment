import { uniqueId } from "lodash";
import React, { useMemo } from "react";
import { View } from "react-native";
import { FormSelectiveOptionsMapProps } from "../../../../../types";
import SmallText from "../../../../UI/Text/SmallText";
import { getActiveTileStyle } from "../../config/formConfig";
import { StyledPressable, StyledScrollView } from "../../style/Form.style";

const FormSelectiveOptionsMap: React.FC<FormSelectiveOptionsMapProps> = ({
  data,
}) => {
  const activeTileStyle = useMemo(() => getActiveTileStyle(), []);
  const screenElements = data.map((item) => {
    return (
      <View key={item.id}>
        {item.render && (
          <View key={item.id}>
            <StyledScrollView showsVerticalScrollIndicator horizontal>
              {item.data.map((element, index: number) => {
                return (
                  <View key={uniqueId()}>
                    <StyledPressable
                      key={index}
                      onPress={item.pressHandler.bind(this, index)}
                      style={[element.isActive ? activeTileStyle.style : null]}
                    >
                      <SmallText textStyles={activeTileStyle.textStyle}>
                        {element.value}
                      </SmallText>
                    </StyledPressable>
                  </View>
                );
              })}
            </StyledScrollView>
          </View>
        )}
      </View>
    );
  });
  return <View style={{ flex: 1 }}>{screenElements}</View>;
};
export default FormSelectiveOptionsMap;
