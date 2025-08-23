import { useParams, useNavigate } from "react-router-dom";
import PopBrowse from "../components/popups/PopBrowse/PopBrowse.jsx";
import { useState, useEffect } from "react";
import { fetchTasks } from "../services/tasksApi.js";

function CardPage({ onClose }) { 
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTask = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Токен не найден");
      }

      const tasks = await fetchTasks({ token });
      const foundTask = tasks.find((card) => card.id === Number(id));
      
      console.log("Найденная задача:", foundTask);
      
      if (!foundTask) {
        throw new Error("Задача не найдена");
      }

      setTask(foundTask);
    } catch (error) {
      console.error("Ошибка при загрузке задачи:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTask();
  }, [id]);

  const handleTaskUpdated = () => {
    console.log("Задача обновлена, перезагружаем...");
    loadTask(); 
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1); 
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!task) return <div>Задача не найдена</div>;

  console.log("Передача задачи в PopBrowse:", task);

  return (
    <PopBrowse 
      task={task} 
      onClose={handleClose} 
      onTaskUpdated={handleTaskUpdated}
    />
  );
}

export default CardPage;