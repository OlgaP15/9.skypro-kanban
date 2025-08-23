import React from "react";
import Card from "../Card/Card";
import { ColumnWrapper, ColumnTitle, CardsContainer } from "./Column.styled";

function Column({ title, cards }) {
  console.log(`Колонка "${title}":`, cards);
  
  return (
    <ColumnWrapper>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <Card 
              key={card.id}
              card={card} 
            />
          ))
        ) : (
          <div style={{ padding: '10px', color: '#94A6BE', fontStyle: 'italic' }}>
            Нет задач
          </div>
        )}
      </CardsContainer>
    </ColumnWrapper>
  );
}

export default Column;