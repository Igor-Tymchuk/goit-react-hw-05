import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import placeholder from "../../assets/placeholder.png";

const MovieList = ({ list }) => {
  const location = useLocation();

  return (
    <>
      <ul className={s.list}>
        {list.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={s.item}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : placeholder
                }
              />
              <div className={s.details}>
                <p>{movie.title}</p>
                <p>{movie.release_date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
