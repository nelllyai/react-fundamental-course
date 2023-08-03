import React, { useContext } from "react";
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { MyButton } from "../button/MyButton";
import { AuthContext } from "../../../context";

export const Navigation = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  }

  return (
    <nav className={classes.navigation}>
      {isAuth && <MyButton onClick={logout}>Выйти</MyButton>}

      <ul className={classes.list}>
        <li className={classes.item}>
          <Link to="/about">About</Link>
        </li>
        <li className={classes.item}>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
    </nav>
  );
};
