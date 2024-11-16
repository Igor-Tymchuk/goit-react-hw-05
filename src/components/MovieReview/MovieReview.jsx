import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reviewsMovie } from "../../services/api";

const MovieReview = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await reviewsMovie(movieId);
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);
  return (
    reviews &&
    (reviews.results.length ? (
      <div>
        <ul>
          {reviews.results.map((review) => (
            <li key={review.id}>
              <p style={{ fontStyle: "italic" }}>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div>No reviews...</div>
    ))
  );
};

export default MovieReview;
