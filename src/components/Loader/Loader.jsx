import { RotatingLines } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
      <RotatingLines
        visible={true}
        height="70"
        width="70"
        strokeColor="black"
        strokeWidth="4"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loader;
