import React from "react";
import { Wrapper } from "./styles/Wrapper.styled";
import AppRoutes from "./components/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Wrapper>
          <AppRoutes />
        </Wrapper>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;