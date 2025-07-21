import React from "react";

export default function popUser({ onClose }) {
  return (
    <div className="header__pop-user-set pop-user-set" id="user-set-target">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        x
      </a>
      <p className="pop-user-set__name">Olga Petrova</p>
      <p className="pop-user-set__mail">olga.petrova@gmail.com</p>
      <div className="pop-user-set__theme">
        <p>Темная тема</p>
        <input type="checkbox" className="checkbox" name="checkbox"></input>
      </div>
      <button
        type="button"
        className="_hover03"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <a href="#popExit">Выйти</a>
      </button>
    </div>
  );
}
