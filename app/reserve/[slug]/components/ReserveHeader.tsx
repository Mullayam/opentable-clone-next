import convertToDisplayTime, {
  Times,
} from "../../../../utils/convertToDisplayTime";
import { format } from "date-fns";
export default function ReserveHeader({
  day,
  image,
  name,
  partySize,
}: {
  partySize: string;
  day: string;
  image: string;
  name: string;
}) {
  const [date, time] = day.split("T");
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-24 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(date), "ccc, LLL d yyyy")}</p>
            <p className="mr-6">{convertToDisplayTime(time as Times)}</p>
            <p className="mr-6">
              {partySize} {partySize?.length > 0 ? "people" : "person"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
