import "./StarRating.scss";

type StarRatingProps = {
  average: number;
  count: number;
  interactive?: boolean;
  onRate?: (score: number) => void;
};

export default function StarRating({
  average,
  count,
  interactive = false,
  onRate,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      <div className="star-rating__stars">
        {stars.map((star) => (
          <span
            key={star}
            className={`star-rating__star ${
              star <= Math.round(average) ? "star-rating__star--filled" : ""
            } ${interactive ? "star-rating__star--interactive" : ""}`}
            onClick={() => interactive && onRate?.(star)}
          >
            ★
          </span>
        ))}
      </div>
      <span className="star-rating__meta">
        {average > 0 ? average.toFixed(1) : "No ratings"}{" "}
        {count > 0 && `(${count})`}
      </span>
    </div>
  );
}
