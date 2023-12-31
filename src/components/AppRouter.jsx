import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";
import { AuthContext } from "../context";
import { Loader } from "./UI/loader/Loader";

export const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element}></Route>
      ))}
      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element}></Route>
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
