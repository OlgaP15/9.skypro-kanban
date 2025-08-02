//Не найденная страница 404
import React from "react";
import {
  NotFoundContainer,
  NotFoundTitle,
  NotFoundText,
} from "./NotFoundPage.styled";

function NotFoundPage() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Страница не найдена</NotFoundText>
    </NotFoundContainer>
  );
}
export default NotFoundPage;
