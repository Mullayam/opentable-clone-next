import { Inter } from "@next/font/google";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Header />
      <RestaurantCard />
    </main>
  );
}
