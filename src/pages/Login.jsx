import React, { useContext } from "react";
import { MyInput } from "../components/UI/input/MyInput";
import { MyButton } from "../components/UI/button/MyButton";
import { AuthContext } from "../context";

export const Login = () => {
  const { setIsAuth } = useContext(AuthContext);

  const login = (event) => {
    event.preventDefault();
    localStorage.setItem("auth", "true");
    setIsAuth(true);
  };

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Логин..." />
        <MyInput type="password" placeholder="Пароль..." />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
};
