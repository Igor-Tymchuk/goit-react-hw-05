import { trendingMovie } from "../../services/api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [list, setList] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await trendingMovie();
        setList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return list && <MovieList list={list.results} />;
};

export default HomePage;
