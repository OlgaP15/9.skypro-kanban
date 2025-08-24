import React, { useRef, useState } from "react";
import {
  PopUserContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  PopUserButton,
} from "../PopUser/PopUser.styled";
import PopExit from "../PopExit/PopExit";

function PopUser({ $isVisible, onClose }) {
  const [isExitOpen, setIsExitOpen] = useState(false);
  const ref = useRef();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userName = userInfo?.name || "Пользователь";
  const userLogin = userInfo?.login || "Эл. почта";

  if (!$isVisible) return null;

  return (
    <>
      <PopUserContainer ref={ref} $isVisible={$isVisible} id="user-set-target">
        <PopUserName>{userName}</PopUserName>
        <PopUserMail>{userLogin}</PopUserMail>
        <PopUserTheme>
          <p>Темная тема</p>
          <input type="checkbox" className="checkbox" name="checkbox" />
        </PopUserTheme>
        <PopUserButton type="button" onClick={() => setIsExitOpen(true)}>
          Выйти
        </PopUserButton>
      </PopUserContainer>
      {isExitOpen && (
        <PopExit
          onClose={() => {
            setIsExitOpen(false);
            onClose && onClose();
          }}
        />
      )}
    </>
  );
}
export default PopUser;