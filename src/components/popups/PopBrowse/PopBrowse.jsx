import React, { useState, useEffect } from "react";
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

const formatDateForServer = (dateString) => {
  if (!dateString) return "";
  
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

function PopBrowse({ task, onClose }) {
  const navigate = useNavigate();
  const { updateTask, deleteTask, operationLoading } = useTasks();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStatus, setEditedStatus] = useState(task?.status || "БЕЗ СТАТУСА");
  const [editedDescription, setEditedDescription] = useState(task?.description || "");
  const [editedDate, setEditedDate] = useState(task?.date || "");

  useEffect(() => {
    if (task) {
      setEditedStatus(task.status || "БЕЗ СТАТУСА");
      setEditedDescription(task.description || "");
      setEditedDate(task.date || "");
    }
  }, [task]);

  if (!task) {
    onClose && onClose();
    return null;
  }

  const getThemeClass = (topic) => {
    switch (topic) {
      case "Web Design": return "webDesign";
      case "Research": return "research";
      case "Copywriting": return "copywriting";
      default: return "gray";
    }
  };

  const themeClass = getThemeClass(task.topic);

  const handleCancel = () => {
    setEditedStatus(task.status || "БЕЗ СТАТУСА");
    setEditedDescription(task.description || "");
    setEditedDate(task.date || "");
    setIsEditMode(false);
  };

  const handleSave = async () => {
    if (!editedDescription.trim()) {
      alert("Введите описание задачи");
      return;
    }

    try {
      const serverId = task._id || task.id;
      if (!serverId) {
        throw new Error("Не найден ID задачи");
      }

      const updatedTask = {
        title: task.title,
        description: editedDescription.trim(),
        status: editedStatus,
        date: formatDateForServer(editedDate),
        topic: task.topic,
      };

      await updateTask(serverId, updatedTask);
      alert("Задача успешно обновлена!");
      setIsEditMode(false);
    } catch (error) {
      alert("Не удалось обновить задачу: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить эту задачу?")) return;

    try {
      const serverId = task._id || task.id;
      if (!serverId) {
        throw new Error("Не найден ID задачи");
      }
      
      await deleteTask(serverId);
      alert("Задача удалена!");
      navigate("/");
    } catch (error) {
      alert("Не удалось удалить задачу: " + error.message);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <PopBrowseStyled onClick={handleClose} id="popBrowse">
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
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                </FormBrowseBlock>
              </PopBrowseForm>
              <Calendar 
                value={editedDate} 
                onChange={setEditedDate} 
                isDisabled={!isEditMode} 
              />
            </PopBrowseWrap>

            {!isEditMode ? (
              <PopBrowseButtons className="pop-browse__btn-browse">
                <div className="btn-group">
                  <button
                    className="btn-browse__edit _btn-bor _hover03"
                    onClick={() => setIsEditMode(true)}
                    disabled={operationLoading}
                  >
                    Редактировать задачу
                  </button>
                  <button
                    className="btn-browse__delete _btn-bor _hover03"
                    onClick={handleDelete}
                    disabled={operationLoading}
                  >
                    Удалить задачу
                  </button>
                </div>
                <button
                  className="btn-edit__edit _btn-bg _hover01"
                  onClick={handleClose} 
                  disabled={operationLoading}
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
                    disabled={operationLoading}
                  >
                    {operationLoading ? "Сохранение..." : "Сохранить"}
                  </button>
                  <button
                    className="btn-edit__edit _btn-bor _hover03"
                    onClick={handleCancel}
                    disabled={operationLoading}
                  >
                    Отменить
                  </button>
                  <button
                    className="btn-edit__delete _btn-bor _hover03"
                    id="btnDelete"
                    onClick={handleDelete}
                    disabled={operationLoading}
                  >
                    Удалить задачу
                  </button>
                </div>
                <button
                  onClick={handleClose} 
                  className="btn-edit__close _btn-bg _hover01"
                  disabled={operationLoading}
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