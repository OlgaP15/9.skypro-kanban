import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles/Wrapper.styled";
import AppRoutes from "./components/AppRoutes";

function App() {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("isAuth") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
    console.log("isAuth", isAuth);
  }, [isAuth]);

  return (
    <Wrapper>
      <AppRoutes isAuth={isAuth} setIsAuth={setIsAuth} />
    </Wrapper>
  );
}

export default App;
