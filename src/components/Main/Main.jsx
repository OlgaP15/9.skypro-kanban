import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import { cardList, statusList } from "../../data.js";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          {isLoading ? (
            <div className="loading-text">Данные загружаются...</div>
          ) : (
            statusList.map((status) => (
              <Column
                key={status}
                title={status}
                cards={cardList.filter((card) => card.status === status)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
