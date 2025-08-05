import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Calendar from "../../Calendar/Calendar";
import {
  PopNewCardStyled,
  PopNewCardContainer,
  PopNewCardBlock,
  PopNewCardContent,
  PopNewCardTitle,
  PopNewCardClose,
  PopNewCardWrap,
  PopNewCardForm,
  FormNewBlock,
  FormNewInput,
  FormNewArea,
  FormNewCreate,
  Categories,
  CategoriesP,
  CategoriesThemes,
  CategoriesTheme,
  Subtitle,
} from "./PopNewCard.styled";

function PopNewCard({ onClose }) {
  const handleCreate = () => {
    alert("Функция создания пока не реализована");
    if (onClose) onClose();
  };

  const [category, setCategory] = useState("Web Design");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  //function handleCreate(e) {
  // посмотреть с наставником
  //e.preventDefault();
  //handleClose();
  //}

  return (
    <PopNewCardStyled id="popNewCard">
      <PopNewCardContainer onClick={handleClose}>
        <PopNewCardBlock onClick={(e) => e.stopPropagation()}>
          <PopNewCardContent>
            <PopNewCardTitle>Создание задачи</PopNewCardTitle>
            <PopNewCardClose onClick={handleClose}>&#10006;</PopNewCardClose>
            <PopNewCardWrap>
              <PopNewCardForm id="formNewCard" action="#">
                <FormNewBlock>
                  <Subtitle htmlFor="formTitle">Название задачи</Subtitle>
                  <FormNewInput
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormNewBlock>
                <FormNewBlock>
                  <Subtitle htmlFor="textArea">Описание задачи</Subtitle>
                  <FormNewArea
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    onChange={(e) => setText(e.target.value)}
                  />
                </FormNewBlock>
              </PopNewCardForm>
              <Calendar />
            </PopNewCardWrap>
            <Categories>
              <CategoriesP>Выберете категорию</CategoriesP>
              <CategoriesThemes>
                <CategoriesTheme
                  className={`_web-design ${
                    category === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() => setCategory("Web Design")}
                >
                  <p className="_web-design">Web Design</p>
                </CategoriesTheme>
                <CategoriesTheme
                  className={`_research ${
                    category === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => setCategory("Research")}
                >
                  <p className="_research">Research</p>
                </CategoriesTheme>
                <CategoriesTheme
                  className={`_copywriting ${
                    category === "Copywriting" ? "_active-category" : ""
                  }`}
                  onClick={() => setCategory("Copywriting")}
                >
                  <p className="_copywriting">Copywriting</p>
                </CategoriesTheme>
              </CategoriesThemes>
            </Categories>
            <FormNewCreate
              className="_hover01"
              id="btnCreate"
              onClick={handleCreate} // посмотреть
            >
              Создать задачу
            </FormNewCreate>
          </PopNewCardContent>
        </PopNewCardBlock>
      </PopNewCardContainer>
    </PopNewCardStyled>
  );
}
export default PopNewCard;
