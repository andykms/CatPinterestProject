import ButtonProps from "./type";
import { memo } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";


export const Button = memo((props: ButtonProps) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled} className={clsx(styles.button, props.isActive ? styles.active : styles.inactive)}>
      <span className={styles.buttonText}>{props.children}</span>
    </button>
  );
});