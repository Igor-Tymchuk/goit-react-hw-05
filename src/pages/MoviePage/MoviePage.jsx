import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovie } from "../../services/api";
import { useSearchParams } from "react-router-dom";

const MoviePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieList, setMovieList] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.toLowerCase().trim();
    if (!newQuery) return;
    setSearchParams({
      query: newQuery,
      page: 1,
    });
    e.target.reset();
  };

  const handlePage = (pageNumber) => {
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
        const filteredMovie = await searchMovie(currentQuery, currentPage);
        setMovieList(filteredMovie);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchParams]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      {movieList && <MovieList list={movieList.results} query={searchParams} />}
      {movieList && (
        <p>
          Page: {movieList.page}/{movieList.total_pages}
        </p>
      )}
      {movieList && (
        <>
          <button
            type="button"
            disabled={movieList.page <= 1}
            onClick={() => handlePage(movieList.page - 1)}
          >
            Prev
          </button>
          <button
            type="button"
            disabled={movieList.total_pages <= movieList.page}
            onClick={() => handlePage(movieList.page + 1)}
          >
            Next
          </button>
        </>
      )}
    </>
  );
};

export default MoviePage;
