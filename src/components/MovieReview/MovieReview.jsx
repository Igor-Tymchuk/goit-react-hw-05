import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reviewsMovie } from "../../services/api";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const MovieReview = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        setError(null);
        const data = await reviewsMovie(movieId);
        setReviews(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    })();
  }, [movieId]);
  return (
    <>
      {loader && <Loader />}
      {error && (
        <Error
          status={error.response?.status}
          message={error.response?.data?.status_message}
        />
      )}
      {reviews &&
        (reviews.results.length ? (
          <ul>
            {reviews.results.map((review) => (
              <li key={review.id}>
                <b>{review.author}</b>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div>No reviews...</div>
        ))}
    </>
  );
};

export default MovieReview;
