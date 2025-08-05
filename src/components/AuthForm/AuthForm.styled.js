import styled from "styled-components";

export const AuthBg = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(9, 30, 63, 0.3);
`;

export const AuthModal = styled.div`
  width: 368px;
  min-height: ${({ $isSignUp }) => ($isSignUp ? "345px" : "329px")};
  height: auto;
  padding: 50px 60px 50px 60px;
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;
  box-shadow: 0px 4px 40px -10px rgba(0, 0, 0, 0.1);

  @media (max-width: 375px) {
    width: 100%;
    padding: 20px;
  }
`;

export const AuthWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthTitle = styled.h2`
  color: #000000;
  font-family: Roboto;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: -0.03em;
  text-align: center;
`;

export const AuthFormstyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  width: 248px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const AuthInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  border: 0.7px solid
    ${({ $error }) => ($error ? "red" : "rgba(148, 166, 190, 0.4)")};
  outline: none;
  padding: 4.5px 10px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.02em;

  &::placeholder {
    color: #94a6be;
  }
`;

export const ButtonEnter = styled.button`
  width: 248px;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #33399b;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: ${({ $isSignUp }) => ($isSignUp ? "row" : "column")};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: ${({ $isSignUp }) => ($isSignUp ? "5px" : "0px")};

  p {
    color: #94a6be66;
    line-height: 21px;
    letter-spacing: -0.14px;
    font-family: Roboto;
    font-weight: 400;
    font-size: 14px;
  }

  a {
    color: #94a6be66;
    line-height: 21px;
    letter-spacing: -0.14px;
    text-decoration: underline;
    cursor: pointer;
    font-family: Roboto;
    font-weight: 400;
    font-size: 14px;

    &:hover {
      color: #565eef;
    }
  }
`;
export const ErrorText = styled.p`
  color: #f84d4d;
  font-size: 12px;
  margin: 7px 0 20px 0;
  font-family: Arial;
`;
