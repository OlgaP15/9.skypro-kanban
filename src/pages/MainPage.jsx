import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopNewCard from "../components/popups/PopNewCard/PopNewCard";
import "../App.css";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalStyles } from "../styles/GlobalStyles.styled";

function MainPage({ loading, setIsAuth }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isNewCardOpen = location.pathname === "/new-card";
  const closeNewCard = () => navigate("/");

  return (
    <div className="wrapper">
      <GlobalStyles />
      <Header setIsAuth={setIsAuth} />
      <Main loading={loading} />
      <Outlet />
      {isNewCardOpen && <PopNewCard onClose={closeNewCard} />}
    </div>
  );
}
export default MainPage;
