import React, { useState, useEffect } from "react";
import Column from "../Column/Column";
import { cardList, statusList } from "../../data.js";
import { MainBlock, MainContent, LoadingText } from "./Main.styled";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainBlock>
      <div className="container">
        <MainContent>
          {isLoading ? (
            <LoadingText>Данные загружаются...</LoadingText>
          ) : (
            statusList.map((status) => (
              <Column
                key={status}
                title={status}
                cards={cardList.filter((card) => card.status === status)}
              />
            ))
          )}
        </MainContent>
      </div>
    </MainBlock>
  );
}
