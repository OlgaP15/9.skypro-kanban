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
import { useTasks } from "../../../contexts/TaskContext";

function PopNewCard({ onClose }) {
  const [category, setCategory] = useState("Web Design");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { createTask } = useTasks();
  const navigate = useNavigate();

  const handleClose = () => navigate(-1);

  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Введите название задачи");
      return;
    }
    setIsLoading(true);
    try {
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        topic: category,
        status: "БЕЗ СТАТУСА",
        date: date || new Date().toLocaleDateString("ru-RU"),
      };
      await createTask(newTask);
      onClose ? onClose() : handleClose();
    } catch (error) {
      alert("Не удалось создать задачу: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormNewBlock>
                <FormNewBlock>
                  <Subtitle htmlFor="textArea">Описание задачи</Subtitle>
                  <FormNewArea
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormNewBlock>
              </PopNewCardForm>
              <Calendar value={date} onChange={setDate} />
            </PopNewCardWrap>
            <Categories>
              <CategoriesP>Выберете категорию</CategoriesP>
              <CategoriesThemes>
                <CategoriesTheme
                  className={`_web-design ${category === "Web Design" ? "_active-category" : ""}`}
                  onClick={() => setCategory("Web Design")}
                >
                  <p className="_web-design">Web Design</p>
                </CategoriesTheme>
                <CategoriesTheme
                  className={`_research ${category === "Research" ? "_active-category" : ""}`}
                  onClick={() => setCategory("Research")}
                >
                  <p className="_research">Research</p>
                </CategoriesTheme>
                <CategoriesTheme
                  className={`_copywriting ${category === "Copywriting" ? "_active-category" : ""}`}
                  onClick={() => setCategory("Copywriting")}
                >
                  <p className="_copywriting">Copywriting</p>
                </CategoriesTheme>
              </CategoriesThemes>
            </Categories>
            <FormNewCreate
              className="_hover01"
              id="btnCreate"
              onClick={handleCreate}
              disabled={isLoading || !title.trim()}
            >
              {isLoading ? "Создание..." : "Создать задачу"}
            </FormNewCreate>
          </PopNewCardContent>
        </PopNewCardBlock>
      </PopNewCardContainer>
    </PopNewCardStyled>
  );
}

export default PopNewCard;