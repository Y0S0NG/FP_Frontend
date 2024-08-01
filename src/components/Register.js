import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import ErrorModal from './ErrorModal';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const isValidUsername = (username) => {
        // 正则表达式用于验证格式 "任意长度的中文字符-cccDcc"
        const regex = /^[\u4e00-\u9fff]+-[a-zA-Z]{3}[0-9][a-zA-Z]{2}$/;
        return regex.test(username);
    };

    const handleRegister = async () => {
        if (!isValidUsername(username)) {
            setErrorMessage("用户名需使用 '姓名-computingID' 的格式");
            return;
        }

        try {
            await axios.post('/api/register/', { username, password });
            navigate('/login');
        } catch (error) {
            console.error('Registration failed', error);
            setErrorMessage('注册失败，请重试。');
        }
    };

    const closeErrorModal = () => {
        setErrorMessage('');
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="请使用 '姓名-computingID' 的格式"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputField}
            />
            <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
            />
            <button onClick={handleRegister} className={styles.button}>Register</button>

            <ErrorModal message={errorMessage} onClose={closeErrorModal} />
        </div>
    );
}

export default Register;
