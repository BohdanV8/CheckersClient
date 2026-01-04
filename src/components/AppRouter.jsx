import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../router/routes";
const AppRouter = () => {
  let routesToRender = [...publicRoutes];
  return (
    <Routes>
      {routesToRender.map((el) => (
        <Route path={el.path} element={<el.element />} key={el.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
