import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

interface LocationState {
  phone: string;
}

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = (location.state as LocationState) || { phone: "" }; // Получаем номер телефона из состояния маршрута

  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const [timer, setTimer] = useState(30);

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
    setError("");
  };

  async function requestOtp(phoneNumber: string): Promise<void> {
    try {
        const response = await axios.post('https://shift-backend.onrender.com/auth/otp', {
            phone: phoneNumber
        });
        console.log('OTP успешно отправлен:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка при запросе OTP:', error.response?.data);
        } else {
            console.error('Неизвестная ошибка:', error);
        }
    }
}

async function signIn(phoneNumber: string, otpCode: Number): Promise<void> {
    try {
        const response = await axios.post('https://shift-backend.onrender.com/users/signin', {
            phone: phoneNumber,
            code: otpCode
        });
        console.log('Пользователь авторизован:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка при авторизации:', error.response?.data);
        } else {
            console.error('Неизвестная ошибка:', error);
        }
    }
}


async function getUserSession(token: Number): Promise<void> {
    try {
        const response = await axios.post('https://shift-backend.onrender.com/users/session', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Данные о пользователе:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка при получении данных о пользователе:', error.response?.data);
        } else {
            console.error('Неизвестная ошибка:', error);
        }
    }
}

const registration = () => {
    if (verificationCode.length !== 6) { // Проверка длины кода
        setError('Код должен содержать 6 цифр');
        return;
    }
    console.log(verificationCode);
    signIn(phone, parseInt(verificationCode, 10));
    getUserSession(parseInt(verificationCode, 10));
}

  const handleResendCode = () => {
    if (isCooldown) {
      alert(
        `Пожалуйста, подождите ${timer} секунд перед повторной отправкой кода.`
      );
      return;
    }

    requestOtp(phone);
    setIsCooldown(true);
    setTimer(30);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCooldown && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCooldown(false);
    }

    return () => clearInterval(interval);
  }, [isCooldown, timer]);

  return (
    <div className="page">
      <div className="content">
        <div className="title">Вход</div>
        <p className="paragraph">
          Введите проверочный код для входа
          <br /> в личный кабинет
        </p>
        <div className="input">
          <div className="with-label">
            <div className="input-default">
              <div className="input-content">
                <div className="content-2">{phone}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="input">
          <div className="with-label">
            <div className="input-default">
              <div className="input-content">
                <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder="Проверочный код"
                  value={verificationCode}
                  onChange={InputChange}
                />
              </div>
            </div>
          </div>
        </div>
        {error && <span style={{ color: 'red'}}>{error}</span>}
        <div className="button-frame">
          <button className="button" onClick={registration}>
            <p className="button-2">Войти</p>
          </button>
        </div>
        <button onClick={handleResendCode} disabled={isCooldown} className={isCooldown ? 'button-cooldown' : 'button-default'}>
  {isCooldown
    ? `Повторная отправка через ${timer} секунд`
    : "Отправить код повторно"}
</button>
      </div>
    </div>
  );
};

export default SecondPage;
