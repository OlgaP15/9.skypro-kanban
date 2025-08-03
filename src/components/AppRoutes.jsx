import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import CardPage from "../pages/CardPage";
import NewCardPage from "../pages/NewCardPage";
import ExitPage from "../pages/ExitPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      return Boolean(token && token !== "undefined");
    } catch (e) {
      return false;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute isAuth={isAuth} />}>
          <Route path="/" element={<MainPage setIsAuth={setIsAuth} />} />
          <Route path="/card/:id" element={<CardPage />} />
          <Route path="/new-card" element={<NewCardPage />} />
          <Route path="/exit" element={<ExitPage setIsAuth={setIsAuth} />} />
        </Route>
        <Route path="/login" element={<SignInPage setIsAuth={setIsAuth} />} />
        <Route
          path="/register"
          element={<SignUpPage setIsAuth={setIsAuth} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
