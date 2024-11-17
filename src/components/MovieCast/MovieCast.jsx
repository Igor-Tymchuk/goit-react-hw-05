import { useParams } from "react-router-dom";
import { creditsMovie } from "../../services/api";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import placeholder from "../../assets/placeholder.png";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        setError(null);
        const data = await creditsMovie(movieId);
        setCasts(data);
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
      {casts && (
        <ul className={s.list}>
          {casts.cast.map((actor) => (
            <li key={actor.id} className={s.cast}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : placeholder
                }
                alt={actor.name}
              />
              <p className={s.role}>&quot;{actor.character}&quot;</p>
              <p>{actor.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
