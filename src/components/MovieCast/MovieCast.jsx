import { useParams } from "react-router-dom";
import { creditsMovie } from "../../services/api";
import { useEffect, useState } from "react";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await creditsMovie(movieId);
        setCasts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);
  return (
    casts && (
      <div>
        <ul>
          {casts.cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt=""
              />
              <p>{actor.character}</p>
              <p>{actor.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default MovieCast;
