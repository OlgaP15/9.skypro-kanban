import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import "../App.css";
import { Outlet } from "react-router-dom";
import { GlobalStyles } from "../styles/GlobalStyles.styled";

function MainPage() {
  return (
    <div className="wrapper">
      <GlobalStyles />
      <Header />
      <Main />
      <Outlet />
    </div>
  );
}
export default MainPage;