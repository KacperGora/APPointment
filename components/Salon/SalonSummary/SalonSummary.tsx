import React, { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CarouselComponent from "./Carousel/CarouselComponent";
import RingChartCard from "./RingChartCard";
import BarChartCard from "./StackedChartCard/BarChartCard";
import {
  getCarouselBarChartData,
  getCarouselRingChartData,
} from "./carouselConfig";

function SalonSummary() {
  const ringChartData = useRef(getCarouselRingChartData());
  const barChartData = useRef(getCarouselBarChartData());

  const renderRingChartItem = ({ item }) => {
    return <RingChartCard item={item} />;
  };
  const renderStackChartItem = ({ item }) => {
    return <BarChartCard item={item} />;
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <CarouselComponent
        data={ringChartData.current}
        renderItem={renderRingChartItem}
      />

      <CarouselComponent
        data={barChartData.current}
        renderItem={renderStackChartItem}
      />
    </ScrollView>
  );
}

export default SalonSummary;
