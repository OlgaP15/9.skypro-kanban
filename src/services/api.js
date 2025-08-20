import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signIn({ login, password }) {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        login,
        password,
      },
      {
        headers: {
          "Content-Type": "",
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      // Сервер ответил с ошибкой
      throw new Error(error.response.data.message || "Ошибка при входе");
    } else if (error.request) {
      // Запрос был сделан, но ответа не было
      throw new Error("Сервер не отвечает. Проверьте интернет-соединение.");
    } else {
      // Ошибка при настройке запроса
      throw new Error("Ошибка при отправке запроса");
    }
  }
}

export async function signUp({ name, login, password }) {
  try {
    const response = await axios.post(
      API_URL,
      {
        name,
        login,
        password,
      },
      {
        headers: {
          "Content-Type": "",
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Ошибка при регистрации");
    } else if (error.request) {
      throw new Error("Сервер не отвечает. Проверьте интернет-соединение.");
    } else {
      throw new Error("Ошибка при отправке запроса");
    }
  }
}
