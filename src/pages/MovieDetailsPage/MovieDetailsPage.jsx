import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { detailsMovie } from "../../services/api";
import { Suspense, useEffect, useState } from "react";

const MovieDetailsPage = () => {
  const location = useLocation();
  const goBack = location.state ?? "/movies";
  console.log(location);
  const { movieId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await detailsMovie(movieId);
        setItem(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);

  return (
    item && (
      <>
        <div>
          <Link to={goBack}>go back</Link>
          <img
            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
            alt=""
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
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </>
    )
  );
};

export default MovieDetailsPage;
