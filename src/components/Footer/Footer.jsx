import s from "./Footer.module.css";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <a href="#header" className={s.btn}>
        <MdKeyboardDoubleArrowUp />
        &nbsp;Go Up
      </a>
      <p>
        &quot;<span>MovieInfo</span>&quot; on React by <span>Tymchuk</span>{" "}
        &copy; 2024
      </p>
    </footer>
  );
};

export default Footer;
