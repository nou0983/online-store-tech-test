"use client";

import { Rating } from "react-simple-star-rating";

type StarRatingProps = {
  rate: number;
  // You can pass in a size prop to change the size of the stars whose default value is 20
  size?: number;
};

const StarRating = ({ rate, size = 20 }: StarRatingProps) => {
  return <Rating iconsCount={5} initialValue={rate} size={size} readonly />;
};

export default StarRating;
