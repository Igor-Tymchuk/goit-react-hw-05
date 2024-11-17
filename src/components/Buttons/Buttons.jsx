const Buttons = ({ handlePage, movieList }) => {
  return (
    <>
      <p>
        Page: {movieList.page}/{movieList.total_pages}
      </p>
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
  );
};

export default Buttons;
