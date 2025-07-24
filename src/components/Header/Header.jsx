import React from "react";
import { useState } from "react";
import PopUser from "../popups/PopUser/PopUser";
import {
  HeaderBlock,
  HeaderContent,
  HeaderLogo,
  HeaderNav,
  HeaderButton,
  HeaderUser,
} from "./Header.styled";

export default function Header() {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const toggleUserPopup = () => {
    setIsUserPopupOpen(!isUserPopupOpen);
  };

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
            <HeaderButton className="_hover01" id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </HeaderButton>
            <HeaderUser
              href="#user-set-target"
              className="_hover02"
              onClick={(e) => {
                e.preventDefault();
                toggleUserPopup();
              }}
            >
              Olga Petrova
            </HeaderUser>
            {isUserPopupOpen && <PopUser onClose={toggleUserPopup} />}
          </HeaderNav>
        </HeaderContent>
      </div>
    </HeaderBlock>
  );
}
