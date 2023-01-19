import React, { useMemo } from "react";
import SmallText from "../../../../UI/Text/SmallText";
import { getActiveTileStyle } from "../../config/formConfig";
import { StyledPressable, StyledScrollView } from "../../style/Form.style";

const FormSelectiveOptionsMap = ({ data }) => {
  const activeTileStyle = useMemo(() => {
    return getActiveTileStyle();
  }, []);

  return data.map((item) => {
    return (
      item.render && (
        <StyledScrollView key={item.id} showsVerticalScrollIndicator horizontal>
          {item.data.map((element, index: number) => {
            return (
              <StyledPressable
                key={index}
                onPress={item.pressHandler.bind(this, index)}
                style={[element.isActive ? activeTileStyle.style : null]}
              >
                <SmallText textStyles={activeTileStyle.textStyle}>
                  {element.value}
                </SmallText>
              </StyledPressable>
            );
          })}
        </StyledScrollView>
      )
    );
  });
};
export default FormSelectiveOptionsMap;
