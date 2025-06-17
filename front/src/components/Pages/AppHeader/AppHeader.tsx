import styles from "./AppHeader.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? clsx(styles.active, styles.buttonLink)
            : clsx(styles.buttonLink, styles.inactive)
        }
      >
        Все котики
      </NavLink>
      <NavLink
        to={"/favorites"}
        className={({ isActive }) =>
          isActive
            ? clsx(styles.active, styles.buttonLink)
            : clsx(styles.buttonLink, styles.inactive)
        }
      >
        Любимые котики
      </NavLink>
    </header>
  );
};
