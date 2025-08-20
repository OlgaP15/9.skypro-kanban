import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/kanban";
// Получение всех задач
export async function fetchTasks({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.tasks;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Ошибка при загрузке задач");
  }
}

// Создание новой задачи
export async function createTask({ token, task }) {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/html",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Ошибка при создании задачи");
  }
}

// Редактирование задачи
export async function updateTask({ token, id, task }) {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/html",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Ошибка при обновлении задачи");
  }
}

// Удаление задачи
export async function deleteTask({ token, id }) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Ошибка при удалении задачи");
  }
}
