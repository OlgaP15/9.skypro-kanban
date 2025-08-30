import styled from "styled-components";

export const MainBlock = styled.main`
  width: 100%;
  background-color: #d9dce0ff;
  display: flex;
  justify-content: center;
`;

export const MainContent = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
  gap: 10px;
  text-align: left;

  @media screen and (max-width: 1200px) {
    width: 100%;
    padding: 40px 0 64px;
    display: block;
  }
`;

export const LoadingText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: #565eef;
  margin-top: 50px;
  animation: pulse 1.5s infinite;
`;

export const EmptyTasksText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: #94A6BE;
  margin-top: 50px;
  font-style: italic;
`;