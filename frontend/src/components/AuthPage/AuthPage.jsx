import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthPage.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Переключатель между логином и регистрацией
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    verificationCode: ""
  });
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false); // Флаг, что код отправлен
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Функция для отправки кода подтверждения на email
  const handleSendCode = async () => {
    setError("");
    if (!formData.email) {
      setError("Пожалуйста, введите email для отправки кода.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/auth/send-code/", { email: formData.email });
      // Если сервер вернул статус 200, считаем, что письмо успешно отправлено
      if (response.status === 200) {
        setCodeSent(true);
      } else {
        setError("Не удалось отправить код. Попробуйте еще раз.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Ошибка при отправке кода.";
      setError(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      // Проверяем совпадение паролей
      if (formData.password !== formData.password2) {
        setError("Пароли не совпадают");
        return;
      }
      // Проверяем, что код отправлен и введён
      if (!codeSent) {
        setError("Пожалуйста, отправьте код подтверждения на почту.");
        return;
      }
      if (!formData.verificationCode) {
        setError("Введите код подтверждения.");
        return;
      }
    }

    const url = isLogin
      ? "http://localhost:8000/auth/login/"
      : "http://localhost:8000/auth/register/";
    const data = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;

    try {
      console.log("Отправка данных:", data);
      const response = await axios.post(url, data);
      console.log("Ответ сервера:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        throw new Error("Сервер не вернул токен!");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Произошла ошибка";
      setError(errorMessage);
      console.error("Ошибка запроса:", errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <button type="button" onClick={handleSendCode}>
              Отправить код
            </button>
            {codeSent && (
              <input
                type="text"
                name="verificationCode"
                placeholder="Код из письма"
                value={formData.verificationCode}
                onChange={handleInputChange}
                required
              />
            )}
          </>
        )}
        <input
          type="text"
          name="username"
          placeholder="Имя пользователя"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="password2"
            placeholder="Повторите пароль"
            value={formData.password2}
            onChange={handleInputChange}
            required
          />
        )}
        <button type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</button>
      </form>
      <p>
        {isLogin ? "Еще нет аккаунта? " : "Уже есть аккаунт? "}
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setCodeSent(false);
          }}
          className="toggle-auth"
        >
          {isLogin ? "Зарегистрируйтесь" : "Войдите"}
        </span>
      </p>
    </div>
  );
};

export default Auth;
