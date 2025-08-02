import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles/Wrapper.styled";
import AppRoutes from "./components/AppRoutes";

function App() {
  // Восстанавливаем isAuth из localStorage при загрузке
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("isAuth") === "true";
  });

  // Сохраняем isAuth в localStorage при изменении
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
