import React, { useRef } from "react";
import { Pagination } from "react-native-snap-carousel";
import { getPaginationParams } from "./config/carouselConfig";

const PaginationComponent = ({ dotsLength, index }) => {
  const paginationStyleRef = useRef(getPaginationParams());
  return (
    <Pagination
      dotsLength={dotsLength}
      activeDotIndex={index}
      dotStyle={paginationStyleRef.current.dotStyle}
      containerStyle={paginationStyleRef.current.container}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
};
export default PaginationComponent;
