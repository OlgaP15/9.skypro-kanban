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

function AuthForm({
  isSignUp,
  userLogin,
  error: propError,
  isLoading,
}) {
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

  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const error = propError || localError;

  const validateForm = () => {
    const newErrors = {
      name: isSignUp && !formData.name.trim(),
      login: !formData.login.trim(),
      password: !formData.password.trim(),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.login || newErrors.password) {
      setLocalError("Заполните все обязательные поля");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
    if (error) setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isLoading || isSubmitting) return;

    setIsSubmitting(true);
    setLocalError("");

    try {
      const authFunction = isSignUp ? signUp : signIn;
      const dataToSend = isSignUp
        ? formData
        : { login: formData.login, password: formData.password };

      const response = await authFunction(dataToSend);

      if (response) {
        localStorage.setItem("token", response.token || response.user?.token);
        localStorage.setItem("userInfo", JSON.stringify(response.user || response));
        
        userLogin(response.user || response);
        navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setLocalError(
        error.message ||
          (isSignUp ? "Ошибка при регистрации" : "Ошибка при входе")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    isSubmitting ||
    isLoading ||
    !formData.login.trim() ||
    !formData.password.trim() ||
    (isSignUp && !formData.name.trim());

  return (
    <>
      <GlobalStyles />
      <AuthBg>
        <AuthModal $isSignUp={isSignUp}>
          <AuthWrapper>
            <AuthTitle>{isSignUp ? "Регистрация" : "Вход"}</AuthTitle>
            <AuthFormstyle onSubmit={handleSubmit}>
              <InputWrapper>
                {isSignUp && (
                  <AuthInput
                    $error={errors.name}
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting || isLoading}
                  />
                )}
                <AuthInput
                  $error={errors.login}
                  type="text"
                  name="login"
                  placeholder="Эл. почта"
                  value={formData.login}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={isSubmitting || isLoading}
                />
                <AuthInput
                  $error={errors.password}
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting || isLoading}
                />
              </InputWrapper>

              {error && <ErrorText>{error}</ErrorText>}

              <ButtonEnter
                type="submit"
                disabled={isSubmitDisabled}
                style={{
                  backgroundColor: isSubmitDisabled ? "#94A6BE" : "#565EEF",
                  color: "#ffffff",
                  cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting || isLoading
                  ? "Загрузка..."
                  : isSignUp
                  ? "Зарегистрироваться"
                  : "Войти"}
              </ButtonEnter>

              <FormGroup $isSignUp={isSignUp}>
                <p>
                  {isSignUp ? "Уже есть аккаунт?" : "Нужно зарегистрироваться?"}
                </p>
                <Link to={isSignUp ? "/login" : "/register"}>
                  {isSignUp ? "Войдите здесь" : "Регистрируйтесь здесь"}
                </Link>
              </FormGroup>
            </AuthFormstyle>
          </AuthWrapper>
        </AuthModal>
      </AuthBg>
    </>
  );
}

export default AuthForm;