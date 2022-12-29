import React, { useRef } from "react";
import { RowContainerSpaceBetween } from "../../../../shared";
import { getCardEarningFooter } from "../config/ringChartConfig";
import CardEarningPeriodDetail from "./CardEarningsPeriodDetail";

const CardEarningFooter = ({ item, colors }) => {
  const data = useRef(getCardEarningFooter(item, colors));
  return (
    <RowContainerSpaceBetween>
      {data.current.map((element) => (
        <CardEarningPeriodDetail
          key={element.id}
          periodFirstLetter={element.periodFirstLetter}
          earning={element.earning}
          percentage={element.percentage}
          color={element.color}
        />
      ))}
    </RowContainerSpaceBetween>
  );
};
export default CardEarningFooter;
