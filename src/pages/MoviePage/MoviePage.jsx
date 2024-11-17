import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovie } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import Buttons from "../../components/Buttons/Buttons";
import s from "./MoviePage.module.css";

const MoviePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieList, setMovieList] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.toLowerCase().trim();
    if (!newQuery) return;
    setSearchParams(
      {
        query: newQuery,
        page: 1,
      },
      { replace: true }
    );
    e.target.reset();
  };

  const handlePage = (pageNumber) => {
    setMovieList(null);
    setSearchParams({
      query: searchParams.get("query"),
      page: pageNumber,
    });
  };

  useEffect(() => {
    const currentQuery = searchParams.get("query");
    const currentPage = parseInt(searchParams.get("page"));

    if (!currentQuery) return;
    (async () => {
      try {
        setLoader(true);
        setError(null);
        const filteredMovie = await searchMovie(currentQuery, currentPage);
        setMovieList(filteredMovie);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    })();
  }, [searchParams]);

  return (
    <>
      <div className={s.box}>
        <form onSubmit={handleSubmit} className={s.form}>
          <input type="text" name="query" className={s.input} />
          <button type="submit" className={s.btn}>
            Search
          </button>
        </form>
        {movieList && !error && (
          <Buttons handlePage={handlePage} movieList={movieList} />
        )}
        {movieList && (
          <p className={s.text}>
            <span>{movieList.total_results}</span> results for `
            <span>{searchParams.get("query")}</span>`
          </p>
        )}
      </div>
      {!movieList && !error && <div className={s.empty}></div>}
      {movieList && !error && <MovieList list={movieList.results} />}
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

export default MoviePage;
