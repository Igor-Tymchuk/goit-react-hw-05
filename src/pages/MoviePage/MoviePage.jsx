import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovie } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import Buttons from "../../components/Buttons/Buttons";

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
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      {movieList && !error && (
        <>
          <MovieList list={movieList.results} query={searchParams} />
          <Buttons handlePage={handlePage} movieList={movieList} />
        </>
      )}
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
