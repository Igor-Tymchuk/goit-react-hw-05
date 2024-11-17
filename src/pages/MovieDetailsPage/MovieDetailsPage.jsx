import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { detailsMovie } from "../../services/api";
import { Suspense, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const MovieDetailsPage = () => {
  const location = useLocation();
  const goBack = location.state ?? "/movies";
  const { movieId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        setError(null);
        const data = await detailsMovie(movieId);
        setItem(data);
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
      {item && (
        <div>
          <Link to={goBack}>Go back</Link>
          <img
            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
            alt={item.title}
          />
          <p>{item.title}</p>
          <ul>
            <li>
              <Link to="reviews" state={location.state}>
                Reviews
              </Link>
            </li>
            <li>
              <Link to="cast" state={location.state}>
                Cast
              </Link>
            </li>
          </ul>
        </div>
      )}
      {item && (
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      )}
      {error && (
        <Error
          status={error.response?.status}
          message={error.response?.data?.status_message}
        />
      )}
    </>
  );
};

export default MovieDetailsPage;
