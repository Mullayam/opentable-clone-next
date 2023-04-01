import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import Description from "./components/Description";
import Title from "./components/Title";
import Ratings from "./components/Ratings";
import ReservationCard from "./components/ReservationCard";

export default function RestaurantDetails() {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar />
        <Title />
        <Ratings />
        <Description />
        <Gallery />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
