import React from "react";
import Card from "../Card/Card";
import { ColumnWrapper, ColumnTitle, CardsContainer } from "./Column.styled";

function Column({ title, cards }) {
  return (
    <ColumnWrapper>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardsContainer>
    </ColumnWrapper>
  );
}
export default Column;
