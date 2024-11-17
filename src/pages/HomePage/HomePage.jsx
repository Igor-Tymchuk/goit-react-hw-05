import { trendingMovie } from "../../services/api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        setError(null);
        const data = await trendingMovie();
        setList(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    })();
  }, []);
  return (
    <>
      {list && !error && <h2 className={s.title}>Top 20 Trending movies</h2>}
      {!list && !error && <div className={s.empty}></div>}
      {list && !error && <MovieList list={list.results} />}
      {loader && <Loader />}
      {error && (
        <Error
          status={error.response?.status}
          message={error.response?.data?.status_message}
        />
      )}
    </>
  );
};

export default HomePage;
