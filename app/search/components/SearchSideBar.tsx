import { Location, Cuisine, PRICE } from "@prisma/client";
import Link from "next/link";

const SearchSideBar = ({
  locations,
  cuisines,
  searchParams,
}: {
  cuisines: Cuisine[];
  locations: Location[];
  searchParams: {
    location?: string;
    cuisine?: string;
    price?: PRICE;
  };
}) => {
  const prices = [
    { price: PRICE.CHEAP, label: "$" },
    { price: PRICE.REGULAR, label: "$$" },
    { price: PRICE.EXPENSIVE, label: "$$$$" },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: `/search`,
              query: { ...searchParams, location: location.name },
            }}
            key={location.id}
            className="font-light text-reg capitalize cursor-pointer"
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: `/search`,
              query: { ...searchParams, cuisine: cuisine.name },
            }}
            key={cuisine.id}
            className="font-light text-reg capitalize cursor-pointer"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label }) => (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, price },
              }}
              className="border w-full text-reg font-light rounded-l p-2"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
