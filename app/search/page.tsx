import Header from "./components/Header";
import RestaurantCardSearch from "./components/RestaurantCardSearch";
import SearchSideBar from "./components/SearchSideBar";
import { PRICE, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface SearchParams {
  location?: string | any;
  cuisine?: string;
  price?: PRICE;
}
const RestaurantSearch = async (searchParams: SearchParams) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    slug: true,
    cuisine: true,
    location: true,
  };
  const where: any = {};
  if (searchParams.location) {
    const location = { name: { equals: searchParams.location.toLowerCase() } };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = { name: { equals: searchParams.cuisine.toLowerCase() } };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = { equals: searchParams.price };
    where.price = price;
  }

  return await prisma.restaurant.findMany({
    where,
    select,
  });
};

const GetRestaurantLocations = async () => {
  return await prisma.location.findMany();
};
const GetRestaurantCuisines = async () => {
  return await prisma.cuisine.findMany();
};
export default async function Search({
  searchParams,
}: {
  searchParams: { location?: string | any; cuisine?: string; price?: PRICE };
}) {
  const restaurants = await RestaurantSearch(searchParams);
  const cuisines = await GetRestaurantCuisines();
  const locations = await GetRestaurantLocations();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          cuisines={cuisines}
          locations={locations}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length > 1 ? (
            restaurants.map((restaurant) => (
              <RestaurantCardSearch
                key={restaurant.id}
                RestaurantSearchData={restaurant}
              />
            ))
          ) : (
            <div>
              <h1>Sorry, No Search Results were Found..</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
