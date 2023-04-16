import { PrismaClient } from "@prisma/client";

import ReservationForm from "./components/ReservationForm";
import ReserveHeader from "./components/ReserveHeader";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();
const FetchResturantBySlug = async (slug: string) => {
  const Restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });
  if (!Restaurant) {
    return notFound();
  }
  return Restaurant;
};
export default async function Reserve({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { day: string; partySize: string };
}) {
  const RestaurantData = await FetchResturantBySlug(params.slug);
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <ReserveHeader
          image={RestaurantData.main_image}
          name={RestaurantData.name}
          day={searchParams.day}
          partySize={searchParams.partySize}
        />
        <ReservationForm
          slug={params.slug}
          day={searchParams.day}
          partySize={searchParams.partySize}
        />
      </div>
    </div>
  );
}
