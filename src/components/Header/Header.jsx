import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUser from "../popups/PopUser/PopUser";
import {
  HeaderBlock,
  HeaderContent,
  HeaderLogo,
  HeaderNav,
  HeaderButton,
  HeaderUser,
} from "./Header.styled";

function Header({ setIsAuth }) {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const navigate = useNavigate();

  const toggleUserPopup = () => {
    setIsUserPopupOpen((prev) => !prev);
  };

  const userName =
    JSON.parse(localStorage.getItem("userInfo") || "{}").name || "Пользователь";

  return (
    <HeaderBlock>
      <div className="container">
        <HeaderContent>
          <HeaderLogo className="_show _light">
            <a href="" target="_self">
              <img src="/assets/logo.png" alt="logo"></img>
            </a>
          </HeaderLogo>
          <HeaderLogo className="_dark">
            <a href="" target="_self">
              <img src="/assets/logo_dark.png" alt="logo"></img>
            </a>
          </HeaderLogo>
          <HeaderNav>
            <HeaderButton
              className="_hover01"
              id="btnMainNew"
              onClick={() => navigate("new-card")}
            >
              Создать новую задачу
            </HeaderButton>
            <HeaderUser
              href="#user-set-target"
              className="_hover02"
              onClick={(e) => {
                e.preventDefault();
                toggleUserPopup();
              }}
            >
              {userName}
            </HeaderUser>
            <PopUser
              $isVisible={isUserPopupOpen}
              onClose={toggleUserPopup}
              setIsAuth={setIsAuth}
            />
          </HeaderNav>
        </HeaderContent>
      </div>
    </HeaderBlock>
  );
}
export default Header;
