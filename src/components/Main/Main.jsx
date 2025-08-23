import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import { statusList } from "../../data.js";
import { MainBlock, MainContent, LoadingText } from "./Main.styled";
import { fetchTasks } from "../../services/tasksApi.js";

function Main({ loading }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("Токен не найден");
        }

        const tasksData = await fetchTasks({ token });
        console.log("Загруженные задачи:", tasksData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <MainBlock>
        <div className="container">
          <MainContent>
            <LoadingText>Ошибка загрузки: {error}</LoadingText>
          </MainContent>
        </div>
      </MainBlock>
    );
  }

  console.log("Отображаемые задачи:", tasks);

  return (
    <MainBlock>
      <div className="container">
        <MainContent>
          {isLoading || loading ? (
            <LoadingText>Данные загружаются...</LoadingText>
          ) : (
            statusList.map((status) => {
              const filteredTasks = tasks.filter((task) => task.status === status);
              console.log(`Статус: ${status}, Задачи:`, filteredTasks);
              
              return (
                <Column
                  key={status} 
                  title={status}
                  cards={filteredTasks}
                />
              );
            })
          )}
        </MainContent>
      </div>
    </MainBlock>
  );
}

export default Main;