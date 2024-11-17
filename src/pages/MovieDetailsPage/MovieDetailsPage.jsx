import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { detailsMovie } from "../../services/api";
import { Suspense, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import placeholder from "../../assets/placeholder.png";
import s from "./MovieDetailsPage.module.css";
import {
  MdReviews,
  MdRecentActors,
  MdHome,
  MdOutlineKeyboardArrowLeft,
  MdNewReleases,
  MdGrade,
} from "react-icons/md";

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
        <div className={s.box}>
          <div className={s.head}>
            <Link to={goBack} className={s.btn}>
              <MdOutlineKeyboardArrowLeft className={s.icon} />
              Go back
            </Link>
            <p>{item.title}</p>
          </div>
          <img
            className={s.img}
            src={
              item.backdrop_path
                ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                : placeholder
            }
            alt={item.title}
          />
          <p className={s.text}>{item.overview}</p>
          <div className={s.detailsBox}>
            <Link to="reviews" className={s.btn} state={location.state}>
              <MdReviews className={s.icon} /> Reviews
            </Link>
            <Link to="cast" className={s.btn} state={location.state}>
              <MdRecentActors className={s.icon} />
              Cast
            </Link>
            {item.homepage && (
              <a
                href={`${item.homepage}`}
                className={s.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdHome className={s.icon} />
                Home Page
              </a>
            )}
            {item.release_date && (
              <p className={s.info}>
                <MdNewReleases className={s.icon} />
                Release date:&nbsp;<span>{item.release_date}</span>
              </p>
            )}
            {item.popularity && (
              <p className={s.info}>
                <MdGrade className={s.icon} />
                Popularity:&nbsp;<span>{item.popularity}</span>
              </p>
            )}
          </div>
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
