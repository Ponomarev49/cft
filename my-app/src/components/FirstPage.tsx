import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

interface FormData {
    phone: string;
}

const FirstPage: React.FC = () => {
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!phone) {
            setError('Поле является обязательным');
            return;
        }

        console.log('Номер телефона:', phone);
        // Добавьте логику перехода на следующую страницу
        navigate('/second', { state: { phone } });
    };

    const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const digitsOnly = value.replace(/\D/g, '');
        
        setPhone(digitsOnly);
        setError('');
    };


    return (
        <div className="page">
            <div className="content">
                <div className="title">Вход</div>
                <p className="paragraph">Введите номер телефона для входа<br /> в личный кабинет</p>
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <div className="with-label">
                            <div className="input-default">
                                <div className="input-content">
                                    <input type="tel" id="phone" name="phone" placeholder="Телефон" 
                                        value={phone}
                                        onChange={InputChange}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    {error && <span style={{ color: 'red'}}>{error}</span>}
                    <div className="button-frame">
                        <button className="button" type='submit'>
                            <p className="button-2">Продолжить</p>
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default FirstPage;