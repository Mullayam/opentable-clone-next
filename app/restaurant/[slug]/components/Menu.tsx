import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

export default function RestaurantMenu({ menuList }: { menuList: Item[] }) {
  return (
    <main className="bg-white mt-5">
      {menuList.length > 1 ? (
        <div>
          <div className="mt-4 pb-1 mb-1">
            <h1 className="font-bold text-4xl">Menu</h1>
          </div>
          <div className="flex flex-wrap justify-between">
            {menuList.map((menu) => (
              <MenuCard key={menu.id} item={menu} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 pb-1 mb-1">
          <h1 className="flex flex-wrap justify-between">
            This Restaurant Has No Menu to Show
          </h1>
        </div>
      )}
    </main>
  );
}
