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
import { signIn, signUp } from "../../services/api.js";

//const BASE_URL = {
//  signIn: async (data) => {
//    let name = "Пользователь";
//    try {
//      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
//      if (userInfo && userInfo.name) {
//        name = userInfo.name;
//      }
//    } catch (e) {}
//    return {
//      user: { name, login: data.login },
//     token: "true",
//    };
//  },

//  signUp: async (data) => {
//    return {
//     user: { name: data.name, login: data.login },
//      token: "true",
//    };
//  },
//};

function AuthForm({ isSignUp, userLogin, setIsAuth }) {
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
    const newErrors = { name: "", login: "", password: "" };
    let isValid = true;

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = true;
      setError("Заполните все поля");
      isValid = false;
    }

    if (!formData.login.trim()) {
      newErrors.login = true;
      setError("Заполните все поля");
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = true;
      setError("Заполните все поля");
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
        ? await signUp(formData)
        : await signIn({ login: formData.login, password: formData.password });

      if (response && response.user && response.token) {
        userLogin(response.user);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userInfo", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        setIsAuth(true);
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Произошла ошибка при авторизации");
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
                  autoComplete="username"
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
