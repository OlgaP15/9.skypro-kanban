import { useParams, useNavigate } from "react-router-dom";
import PopBrowse from "../components/popups/PopBrowse/PopBrowse.jsx";
import { useMemo } from "react";
import { useTasks } from "../contexts/TaskContext";

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, tasksLoading, tasksError } = useTasks();

  const task = useMemo(
    () => tasks.find((t) => String(t.id ?? t._id) === String(id)),
    [tasks, id]
  );

  if (tasksLoading) return <div>Загрузка...</div>;
  if (tasksError) return <div>Ошибка: {tasksError}</div>;
  if (!task) return <div>Задача не найдена</div>;

  const handleClose = () => navigate(-1);

  return (
    <PopBrowse
      task={task}
      onClose={handleClose}
    />
  );
}

export default CardPage;