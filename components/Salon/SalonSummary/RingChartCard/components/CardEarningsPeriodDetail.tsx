import React from "react";
import { View } from "react-native";
import { CardIncomingsDot, RowContainer } from "../../../../shared";
import SmallText from "../../../../UI/Text/SmallText";
type Props = {
  percentage: number;
  color: string;
  earning: number;
  periodFirstLetter: string;
};
const CardEarningPeriodDetail: React.FC<Props> = ({
  percentage,
  color,
  earning,
  periodFirstLetter,
}) => {
  return (
    <RowContainer>
      <CardIncomingsDot style={{ backgroundColor: color }}>
        <SmallText
          textStyles={{
            color: "white",
            textAlign: "center",
            position: "relative",
            top: 3,
          }}
        >
          {periodFirstLetter}
        </SmallText>
      </CardIncomingsDot>
      <View>
        <SmallText>{earning} PLN</SmallText>
        <SmallText textStyles={{ color: percentage < 90 ? "red" : "green" }}>
          {percentage} %
        </SmallText>
      </View>
    </RowContainer>
  );
};
export default CardEarningPeriodDetail;
