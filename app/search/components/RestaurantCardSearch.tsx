import { PrismaClient, Cuisine, Location, PRICE } from "@prisma/client";

import Link from "next/link";
import Price from "../../components/Price";

interface RestaurantCardSearchProps {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  slug: string;
  cuisine: Cuisine;
  location: Location;
}
export default function RestaurantCardSearch({
  RestaurantSearchData,
}: {
  RestaurantSearchData: RestaurantCardSearchProps;
}) {
  return (
    <div className="border-b flex ml-5 text-bold">
      <img
        src={RestaurantSearchData.main_image}
        alt={RestaurantSearchData.name}
        className="w-44 h-36 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{RestaurantSearchData.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <span className="ml-2 text-sm">Awesome</span>
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
        <div className="text-red-600">
          <Link href={`/restaurant/${RestaurantSearchData.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
