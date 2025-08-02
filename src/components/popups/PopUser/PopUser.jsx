import React, { useEffect, useRef, useState } from "react";
import {
  PopUserContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  PopUserButton,
} from "../PopUser/PopUser.styled";
import PopExit from "../PopExit/PopExit";

function PopUser({ $isVisible, onClose, setIsAuth }) {
  const [isExitOpen, setIsExitOpen] = useState(false);
  const ref = useRef();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userName = userInfo?.name || "Пользователь";
  const userLogin = userInfo?.login || "Эл. почта";

  // Обработчик клика вне окна
  useEffect(() => {
    if (!$isVisible) return;
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose && onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [$isVisible, onClose]);

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
          setIsAuth={setIsAuth}
          onClose={() => {
            setIsExitOpen(false);
            onClose && onClose(); // Закрыть и PopExit, и PopUser
          }}
        />
      )}
    </>
  );
}
export default PopUser;
