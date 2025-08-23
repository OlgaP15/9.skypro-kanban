import React, { useState, useEffect } from "react";
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
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    return Boolean(token && userInfo);
  });

  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  });

  function userLogin(newUser) {
    setUser(newUser);
    setIsAuth(true);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    if (token && userInfo) {
      setIsAuth(true);
      setUser(JSON.parse(userInfo));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute isAuth={isAuth} />}>
          <Route path="/" element={<MainPage setIsAuth={setIsAuth} />}>
            <Route path="/card/:id" element={<CardPage />} />
            <Route path="/new-card" element={<NewCardPage />} />
          </Route>
          <Route path="/exit" element={<ExitPage setIsAuth={setIsAuth} />} />
        </Route>
        <Route path="/login" element={<SignInPage userLogin={userLogin} />} />
        <Route
          path="/register"
          element={<SignUpPage setIsAuth={setIsAuth} userLogin={userLogin} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;