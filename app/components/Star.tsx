import React from "react";
import Image from "next/image";
import emptyStar from "../../public/icons/empty-star.png";
import halfStar from "../../public/icons/half-star.png";
import fullStar from "../../public/icons/full-star.png";
import { Review } from "@prisma/client";
import { CalculateReviewRatingAvg } from "../../utils/calculateReview";

export default function Star({
  reviews,
  rating: ReviewsRating,
}: {
  reviews: Review[];
  rating?: number;
}) {
  const rating = ReviewsRating || CalculateReviewRatingAvg(reviews);
  const renderStar = () => {
    let stars = [];
    for (let index = 0; index < 5; index++) {
      const diference = parseFloat((rating - index).toFixed(1));
      if (diference >= 1) {
        stars.push(fullStar);
      } else if (diference >= 1 && diference > 0) {
        if (diference <= 0.2) {
          stars.push(emptyStar);
        } else if (diference > 0.2 && diference <= 0.6) {
          stars.push(halfStar);
        } else {
          stars.push(fullStar);
        }
      } else {
        stars.push(emptyStar);
      }
    }

    return stars.map((star) => {
      return <Image src={star} alt="" className="w-4 h-4 mr-1" />;
    });
  };
  return <div className="flex items-center">{renderStar()}</div>;
}
