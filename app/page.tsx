import { PrismaClient, Cuisine, Location, PRICE } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

export interface RestaurantCardType {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
}
const primsa = new PrismaClient();

const GetRestaurants = async (): Promise<RestaurantCardType[]> => {
  return await primsa.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
    },
  });
};
export default async function Home() {
  const restaurants = await GetRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
