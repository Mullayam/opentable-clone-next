import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import Description from "./components/Description";
import Title from "./components/Title";
import Ratings from "./components/Ratings";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const primsa = new PrismaClient();

// interface RestuarantDataType {}
const GetRestaurantBySlug = async (slug: string) => {
  const restuarantData = await primsa.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    },
  });
  if (!restuarantData) {
    notFound();
  }
  return restuarantData;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const RestaurantData = await GetRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar slug={RestaurantData.slug} />
        <Title name={RestaurantData.name} />
        <Ratings reviews={RestaurantData.reviews} />
        <Description description={RestaurantData.description} />
        <Gallery images={RestaurantData.images} />
        <Reviews reviews={RestaurantData.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
