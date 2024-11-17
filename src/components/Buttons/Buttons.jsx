import s from "./Buttons.module.css";

const Buttons = ({ handlePage, movieList }) => {
  return (
    <div className={s.box}>
      <button
        className={s.btn}
        type="button"
        disabled={movieList.page <= 1}
        onClick={() => handlePage(movieList.page - 1)}
      >
        Prev
      </button>
      <p className={s.text}>
        Page: <span>{movieList.page}</span>/{movieList.total_pages}
      </p>
      <button
        className={s.btn}
        type="button"
        disabled={movieList.total_pages <= movieList.page}
        onClick={() => handlePage(movieList.page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Buttons;
