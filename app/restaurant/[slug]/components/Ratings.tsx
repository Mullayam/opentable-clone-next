import { Review } from "@prisma/client";
import { CalculateReviewRatingAvg } from "../../../../utils/calculateReview";
import Star from "../../../components/Star";
export default function Ratings({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Star reviews={reviews} />
        <p className="text-reg ml-3">
          {CalculateReviewRatingAvg(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length}
          {reviews.length === 1 ? " review" : " reviews"}
        </p>
      </div>
    </div>
  );
}
