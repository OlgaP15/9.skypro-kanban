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

const formatDateForServer = (dateString) => {
  if (!dateString) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  if (typeof dateString === 'string' && dateString.includes('.')) {
    return dateString; 
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  } catch (error) {
    console.error("Ошибка форматирования даты:", error);
    return "";
  }
};

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
        status: "Без статуса", 
        date: formatDateForServer(date),
      };
      
      console.log("Создаваемая задача:", newTask);
      
      await createTask(newTask);
      alert("Задача создана!");
      onClose ? onClose() : handleClose();
    } catch (error) {
      alert("Не удалось создать задачу: " + error.message);
      console.error("Ошибка создания:", error);
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