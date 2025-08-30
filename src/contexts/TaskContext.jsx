import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchTasks as apiFetch,
  createTask as apiCreate,
  updateTask as apiUpdate,
  deleteTask as apiDelete,
} from "../services/tasksApi";
import { useAuth } from "./AuthContext";

const toApiStatusMap = {
  "БЕЗ СТАТУСА": "Без статуса", 
  "НУЖНО СДЕЛАТЬ": "Нужно сделать",
  "В РАБОТЕ": "В работе", 
  "ТЕСТИРОВАНИЕ": "Тестирование",
  "ГОТОВО": "Готово",
};

const toUiStatusMap = {
  "Без статуса": "БЕЗ СТАТУСА",
  "Нужно сделать": "НУЖНО СДЕЛАТЬ", 
  "В работе": "В РАБОТЕ",
  "Тестирование": "ТЕСТИРОВАНИЕ",
  "Готово": "ГОТОВО",
};

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { token, isAuth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState(null);

  const normalizeTasks = (arr) =>
    (Array.isArray(arr) ? arr : []).map((t) => ({
      ...t,
      id: t.id ?? t._id ?? t.taskId ?? t.uuid,
      status: toUiStatusMap[t.status] || t.status,
    }));

  const loadTasks = async () => {
    if (!token) return;
    setTasksLoading(true);
    setTasksError(null);
    try {
      const data = await apiFetch({ token });
      const normalized = normalizeTasks(data);
      setTasks(normalized);
    } catch (e) {
      setTasksError(e.message || "Ошибка при загрузке задач");
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [isAuth]); 

  const clearOperationError = () => setOperationError(null);

  const createTask = async (task) => {
    setOperationLoading(true);
    setOperationError(null);
    try {
      const apiTask = {
        ...task,
        status: toApiStatusMap[task.status] || task.status,
      };
      await apiCreate({ token, task: apiTask });
      await loadTasks(); 
    } catch (e) {
      setOperationError(e.message || "Ошибка при создании задачи");
      throw e; 
    } finally {
      setOperationLoading(false);
    }
  };

  const updateTask = async (id, task) => {
    setOperationLoading(true);
    setOperationError(null);
    try {
      const apiTask = {
        ...task,
        status: toApiStatusMap[task.status] || task.status
      };
      await apiUpdate({ token, id, task: apiTask });
      await loadTasks(); 
    } catch (e) {
      setOperationError(e.message || "Ошибка при обновлении задачи");
      throw e;
    } finally {
      setOperationLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setOperationLoading(true);
    setOperationError(null);
    try {
      await apiDelete({ token, id });
      await loadTasks(); 
    } catch (e) {
      setOperationError(e.message || "Ошибка при удалении задачи");
      throw e;
    } finally {
      setOperationLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      tasks,
      tasksLoading,
      tasksError,
      operationLoading,
      operationError,
      clearOperationError,
      loadTasks,
      createTask,
      updateTask,
      deleteTask
    }),
    [tasks, tasksLoading, tasksError, operationLoading, operationError]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}