import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../Calendar/Calendar.jsx";
import {
  PopBrowseStyled,
  PopBrowseContainer,
  PopBrowseBlock,
  PopBrowseContent,
  PopBrowseTopBlock,
  PopBrowseTitle,
  PopBrowseWrap,
  PopBrowseForm,
  FormBrowseBlock,
  FormBrowseArea,
  Status,
  StatusP,
  StatusThemes,
  StatusTheme,
  PopBrowseButtons,
  CategoryTheme,
} from "./PopBrowse.styled";
import { statusList } from "../../../data.js";
import { useTasks } from "../../../contexts/TaskContext";

//function normalizeDateOut(date) {
//  if (!date) return "";

//  if (typeof date === "string" && date.includes(".")) return date;
//  const d = new Date(date);
//  if (isNaN(d)) return date;
//  return d.toLocaleDateString("ru-RU");
//}

function PopBrowse({ task, onClose }) {
  const navigate = useNavigate();
  const { updateTask, deleteTask } = useTasks();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStatus, setEditedStatus] = useState(task?.status || "БЕЗ СТАТУСА");
  const [editedText, setEditedText] = useState(task?.description || "");
  const [editDate, setEditDate] = useState(task?.date || "");
  const [isLoading, setIsLoading] = useState(false);

  if (!task) return null;

  const getThemeClass = (topic) => {
    switch (topic) {
      case "Web Design":
        return "webDesign";
      case "Research":
        return "research";
      case "Copywriting":
        return "copywriting";
      default:
        return "gray";
    }
  };

  const themeClass = getThemeClass(task.topic);

  const handleCancel = () => {
    setEditedStatus(task.status || "БЕЗ СТАТУСА");
    setEditedText(task.description || "");
    setEditDate(task.date || "");
    setIsEditMode(false);
  };

  function normalizeDateOut(date) {
  if (!date) return "";
  if (typeof date === "string" && date.includes(".")) return date;
  const d = new Date(date);
  if (isNaN(d)) return date;
  return d.toLocaleDateString("ru-RU");
}

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const serverId = task._id || task.id;
      if (!serverId) {
        alert("Не найден ID задачи для обновления");
        return;
      }

      const updatedTask = {
        title: task.title,
        description: editedText,
        status: editedStatus, 
        date: normalizeDateOut(editDate || task.date),
        topic: task.topic,
      };

      await updateTask(serverId, updatedTask);
      onClose && onClose();
    } catch (error) {
      alert("Не удалось обновить задачу: " + (error?.message || "Неизвестная ошибка"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить эту задачу?")) return;
    setIsLoading(true);
    try {
      const serverId = task._id || task.id;
      if (!serverId) {
        alert("Не найден ID задачи для удаления");
        return;
      }
      await deleteTask(serverId);
      onClose && onClose();
    } catch (error) {
      alert("Не удалось удалить задачу: " + (error?.message || "Неизвестная ошибка"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => navigate(-1);

  return (
    <PopBrowseStyled onClick={onClose} id="popBrowse">
      <PopBrowseContainer>
        <PopBrowseBlock onClick={(e) => e.stopPropagation()}>
          <PopBrowseContent>
            <PopBrowseTopBlock>
              <PopBrowseTitle>{task.title || "Без названия"}</PopBrowseTitle>
              <CategoryTheme className={`_${themeClass} _active-category`}>
                <p className={`_${themeClass}`}>{task.topic || "Без категории"}</p>
              </CategoryTheme>
            </PopBrowseTopBlock>

            <Status>
              <StatusP>Статус</StatusP>
              <StatusThemes>
                {isEditMode ? (
                  statusList.map((status) => (
                    <StatusTheme
                      key={status}
                      onClick={() => setEditedStatus(status)}
                      style={{
                        backgroundColor: editedStatus === status ? "#94A6BE" : "#ffffff",
                        borderColor: "#94A6BE",
                        color: editedStatus === status ? "#ffffff" : "#94A6BE",
                        cursor: "pointer",
                      }}
                    >
                      <p>{status}</p>
                    </StatusTheme>
                  ))
                ) : (
                  <StatusTheme
                    style={{
                      backgroundColor: "#94A6BE",
                      borderColor: "#94A6BE",
                      color: "#ffffff",
                    }}
                  >
                    <p>{task.status || "БЕЗ СТАТУСА"}</p>
                  </StatusTheme>
                )}
              </StatusThemes>
            </Status>

            <PopBrowseWrap>
              <PopBrowseForm id="formBrowseCard" action="#">
                <FormBrowseBlock>
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <FormBrowseArea
                    name="text"
                    id="textArea01"
                    readOnly={!isEditMode}
                    placeholder="Введите описание задачи..."
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                </FormBrowseBlock>
              </PopBrowseForm>
              <Calendar value={editDate} onChange={setEditDate} isDisabled={!isEditMode} />
            </PopBrowseWrap>

            {!isEditMode ? (
              <PopBrowseButtons className="pop-browse__btn-browse">
                <div className="btn-group">
                  <button
                    className="btn-browse__edit _btn-bor _hover03"
                    onClick={() => setIsEditMode(true)}
                    disabled={isLoading}
                  >
                    Редактировать задачу
                  </button>
                  <button
                    className="btn-browse__delete _btn-bor _hover03"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    Удалить задачу
                  </button>
                </div>
                <button
                  className="btn-edit__edit _btn-bg _hover01"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Закрыть
                </button>
              </PopBrowseButtons>
            ) : (
              <PopBrowseButtons className="pop-browse__btn-edit">
                <div className="btn-group">
                  <button
                    className="btn-edit__edit _btn-bg _hover01"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </button>
                  <button
                    className="btn-edit__edit _btn-bor _hover03"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Отменить
                  </button>
                  <button
                    className="btn-edit__delete _btn-bor _hover03"
                    id="btnDelete"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    Удалить задачу
                  </button>
                </div>
                <button
                  onClick={handleClose}
                  className="btn-edit__close _btn-bg _hover01"
                  disabled={isLoading}
                >
                  Закрыть
                </button>
              </PopBrowseButtons>
            )}
          </PopBrowseContent>
        </PopBrowseBlock>
      </PopBrowseContainer>
    </PopBrowseStyled>
  );
}

export default PopBrowse;