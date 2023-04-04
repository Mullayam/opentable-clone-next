import { PrismaClient } from "@prisma/client";
import RestaurantMenu from "../components/Menu";
import RestaurantNavbar from "../components/RestaurantNavbar";

const prisma = new PrismaClient();
async function FetchMenu(slug: string) {
  const data = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      items: true,
    },
  });
  if (!data) {
    throw new Error();
  }
  return data.items;
}

export default async function Menu({ params }: { params: { slug: string } }) {
  const menuList = await FetchMenu(params.slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavbar slug={params.slug} />
      <RestaurantMenu menuList={menuList} />
    </div>
  );
}
