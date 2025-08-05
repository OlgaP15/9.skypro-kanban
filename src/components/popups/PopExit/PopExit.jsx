import { useNavigate } from "react-router-dom";
import {
  PopExitStyle,
  PopExitContainer,
  PopExitBlock,
  PopExitTitle,
  PopExitForm,
  PopExitFormGroup,
  PopExitYesButton,
  PopExitNoButton,
} from "../PopExit/PopExit.styled";

function PopExit({ setIsAuth, onClose }) {
  const navigate = useNavigate();

  const handleYesExit = (e) => {
    e.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    onClose();
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  const handleNoExit = () => {
    onClose();
  };

  return (
    <PopExitStyle id="popExit">
      <PopExitContainer>
        <PopExitBlock>
          <PopExitTitle>
            <h2>Выйти из аккаунта?</h2>
          </PopExitTitle>
          <PopExitForm id="formExit" action="#">
            <PopExitFormGroup>
              <PopExitYesButton
                type="button"
                id="exitYes"
                onClick={handleYesExit}
              >
                Да, выйти
              </PopExitYesButton>
              <PopExitNoButton type="button" id="exitNo" onClick={handleNoExit}>
                Нет, остаться
              </PopExitNoButton>
            </PopExitFormGroup>
          </PopExitForm>
        </PopExitBlock>
      </PopExitContainer>
    </PopExitStyle>
  );
}
export default PopExit;
