import s from "./Error.module.css";

const Error = ({ status, message }) => {
  return (
    <div className={s.error}>
      <p>{status}</p>
      <p>{message}</p>
    </div>
  );
};

export default Error;
