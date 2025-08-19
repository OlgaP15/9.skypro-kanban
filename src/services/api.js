import axios from 'axios';

const API_URL = 'https://wedev-api.sky.pro/api/kanban';

// Получение всех задач пользователя
export async function fetchTasks({ token }) {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.tasks;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

// Получение задачи по ID
export async function fetchTaskById({ token, id }) {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.task;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

// Добавление новой задачи
export async function addTask({ token, taskData }) {
    try {
        const response = await axios.post(API_URL, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/html',
            },
        });
        return response.data.tasks;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

// Изменение задачи
export async function updateTask({ token, id, taskData }) {
    try {
        const response = await axios.put(`${API_URL}/${id}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/html',
            },
        });
        return response.data.tasks;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

// Удаление задачи
export async function deleteTask({ token, id }) {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/html',
            },
        });
        return response.data.tasks;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}