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
    if (!id) {
      console.error("updateTask: не передан id", { id, task });
      throw new Error("ID задачи не передан");
    }
    const url = `${API_URL}/${id}`; 
    const response = await axios.patch(url, task, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "text/html",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Полная ошибка при обновлении:", {
      url: `${API_URL}/${id}`, 
      data: task,
      status: error.response?.status,
      resp: error.response?.data,
      message: error.message,
    });
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Ошибка при обновлении задачи"
    );
  }
}

export async function deleteTask({ token, id }) {
  try {
    if (!id) {
      console.error("deleteTask: не передан id");
      throw new Error("ID задачи не передан");
    }
    const url = `${API_URL}/${id}`; 
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении:", {
      url: `${API_URL}/${id}`, 
      status: error.response?.status,
      resp: error.response?.data,
      message: error.message,
    });
    throw new Error(error.response?.data?.message || "Ошибка при удалении задачи");
  }
}