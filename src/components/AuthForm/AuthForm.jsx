//Форма авторизации
import { ErrorText } from "./AuthForm.styled";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AuthBg,
  AuthModal,
  AuthWrapper,
  AuthTitle,
  AuthFormstyle,
  InputWrapper,
  AuthInput,
  ButtonEnter,
  FormGroup,
} from "./AuthForm.styled.js";
import { GlobalStyles } from "../../styles/GlobalStyles.styled.js";

const mockAuthAPI = {
  signIn: async (data) => {
    let name = "Пользователь";
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      if (userInfo && userInfo.name) {
        name = userInfo.name;
      }
    } catch (e) {}
    return {
      user: { name, login: data.login },
      token: "true",
    };
  },

  signUp: async (data) => {
    return {
      user: { name: data.name, login: data.login },
      token: "true",
    };
  },
};

function AuthForm({ isSignUp, setIsAuth }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    login: false,
    password: false,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { name: false, login: false, password: false };
    let isValid = true;

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = true;
      isValid = false;
    }

    if (!formData.login.trim()) {
      newErrors.login = true;
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: false });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = isSignUp
        ? await mockAuthAPI.signUp(formData)
        : await mockAuthAPI.signIn(formData);

      if (response) {
        setIsAuth(true);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userInfo", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Произошла ошибка");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <GlobalStyles />
      <AuthBg>
        <AuthModal $isSignUp={isSignUp}>
          <AuthWrapper>
            <AuthTitle>{isSignUp ? "Регистрация" : "Вход"}</AuthTitle>
            <AuthFormstyle id="form" action="#" onSubmit={handleSubmit}>
              <InputWrapper>
                {isSignUp && (
                  <AuthInput
                    $error={errors.name}
                    type="text"
                    name="name"
                    id="formname"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                  />
                )}
                <AuthInput
                  $error={errors.login}
                  type="text"
                  name="login"
                  id="formlogin"
                  placeholder="Эл. почта"
                  value={formData.login}
                  onChange={handleChange}
                />
                <AuthInput
                  type="password"
                  name="password"
                  id="formpassword"
                  placeholder="Пароль"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </InputWrapper>

              {error && <ErrorText>{error}</ErrorText>}

              <ButtonEnter
                type="secondary"
                disabled={
                  isSubmitting ||
                  !formData.login.trim() ||
                  !formData.password.trim() ||
                  (isSignUp && !formData.name.trim())
                }
                style={{
                  backgroundColor:
                    isSubmitting ||
                    !formData.login.trim() ||
                    !formData.password.trim() ||
                    (isSignUp && !formData.name.trim())
                      ? "#94A6BE"
                      : "#565EEF",
                  color: "#ffffff",
                  cursor:
                    isSubmitting ||
                    !formData.login.trim() ||
                    !formData.password.trim() ||
                    (isSignUp && !formData.name.trim())
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isSignUp ? "Зарегистрироваться" : "Войти"}
              </ButtonEnter>

              {!isSignUp && (
                <FormGroup $isSignUp={isSignUp}>
                  <p>Нужно зарегистрироваться?</p>
                  <Link to="/register">Регистрируйтесь здесь</Link>
                </FormGroup>
              )}

              {isSignUp && (
                <FormGroup $isSignUp={isSignUp}>
                  <p>Уже есть аккаунт?</p>
                  <Link to="/login">Войдите здесь</Link>
                </FormGroup>
              )}
            </AuthFormstyle>
          </AuthWrapper>
        </AuthModal>
      </AuthBg>
    </>
  );
}
export default AuthForm;
