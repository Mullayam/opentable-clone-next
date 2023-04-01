import Navbar from "../../components/Navbar";
import ReservationForm from "./components/ReservationForm";
import ReserveHeader from "./components/ReserveHeader";

export default function Reserve() {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <ReserveHeader />
        <ReservationForm />
      </div>
    </div>
  );
}
