import React, { useRef, useState } from "react";
import { View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { getPaginationParams } from "./config/carouselConfig";
import PaginationComponent from "./PaginationComponent";

function CarouselComponent({ data, renderItem }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <>
      <Carousel
        vertical={false}
        data={data}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={400}
        onScrollIndexChanged={(index) => setCarouselIndex(index)}
      />
      <PaginationComponent dotsLength={data.length} index={carouselIndex} />
    </>
  );
}
export default CarouselComponent;
