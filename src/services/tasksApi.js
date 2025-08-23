import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/kanban";

export async function fetchTasks({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.tasks;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Ошибка при загрузке задач");
  }
}

export async function createTask({ token, task }) {
  try {
    console.log("Отправляемые данные:", task);
    
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/html", 
      },
    });
    
    console.log("Ответ от API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Полная ошибка API:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      "Ошибка при создании задачи"
    );
  }
}

export async function updateTask({ token, id, task }) {
  try {
    console.log("Обновление задачи:", { id, task }); 
    
    const response = await axios.patch(`${API_URL}/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/html", 
      },
    });
    
    console.log("Ответ при обновлении:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Полная ошибка при обновлении:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      "Ошибка при обновлении задачи"
    );
  }
}

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