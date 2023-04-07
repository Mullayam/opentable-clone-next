import React from 'react'
import Cards from './Cards'
import { RestaurantCardType } from "../page";
// import { Cuisine, Location, PRICE, Review } from "@prisma/client";

interface Props {
  restaurant: RestaurantCardType;
}

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <div className="py-3  mt-10 flex flex-wrap justify-center">
      <Cards restaurant={restaurant} />
    </div>
  );
};

export default RestaurantCard