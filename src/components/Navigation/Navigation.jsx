import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";
import { MdLocalMovies } from "react-icons/md";

const linkNav = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};
const Navigation = () => {
  return (
    <header id="header" className={s.header}>
      <MdLocalMovies className={s.icon} />
      <nav className={s.nav}>
        <NavLink className={linkNav} to="/">
          HomePage
        </NavLink>
        <NavLink className={linkNav} to="/movies">
          MovieList
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
