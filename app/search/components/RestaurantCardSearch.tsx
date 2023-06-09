import { Cuisine, Review, Location, PRICE } from "@prisma/client";

import Link from "next/link";
import Price from "../../components/Price";
import { CalculateReviewRatingAvg } from "../../../utils/calculateReview";
import Star from "../../components/Star";

interface RestaurantCardSearchProps {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  slug: string;
  cuisine: Cuisine;
  location: Location;
  reviews: Review[];
}
export default function RestaurantCardSearch({
  RestaurantSearchData,
}: {
  RestaurantSearchData: RestaurantCardSearchProps;
}) {
  const rendrRatingText = () => {
    const rating = CalculateReviewRatingAvg(RestaurantSearchData.reviews);
    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 2) return "Average";
    else if (rating <= 1 && rating > 0) return "Poor";
    else "No rating";
  };
  return (
    <div className="border-b flex ml-5 text-bold">
      <img
        src={RestaurantSearchData.main_image}
        alt={RestaurantSearchData.name}
        className="w-44 h-36 rounded"
      />
      <div className="pl-5">
        <Link href={`/restaurant/${RestaurantSearchData.slug}`}>
          <h2 className="text-3xl">{RestaurantSearchData.name}</h2>
        </Link>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Star reviews={RestaurantSearchData.reviews} />
          </div>
          <span className="ml-2 text-sm">{rendrRatingText()}</span>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <span className="mr-4">
              <Price price={RestaurantSearchData.price} />
            </span>
            <span className="mr-4 capitalize">
              {RestaurantSearchData.cuisine.name}
            </span>
            <span className="mr-4 capitalize">
              {RestaurantSearchData.location.name}
            </span>
          </div>
        </div>
        <div className="text-red-600 mb-2">
          <Link href={`/restaurant/${RestaurantSearchData.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
