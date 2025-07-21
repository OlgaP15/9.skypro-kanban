import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import { cardList } from "../../data.js";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const statusGroups = {
    "Без статуса": cardList.filter((card) => card.status === "Без статуса"),
    "Нужно сделать": cardList.filter((card) => card.status === "Нужно сделать"),
    "В работе": cardList.filter((card) => card.status === "В работе"),
    Тестирование: cardList.filter((card) => card.status === "Тестирование"),
    Готово: cardList.filter((card) => card.status === "Готово"),
  };

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          {isLoading ? (
            <div className="loading-text">Данные загружаются...</div>
          ) : (
            Object.entries(statusGroups).map(([status, cards]) => (
              <Column key={status} title={status} cards={cards} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
