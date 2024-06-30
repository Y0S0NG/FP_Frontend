import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';  // 使用CSS模块化

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // 添加错误状态
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/token/', { username, password });
            localStorage.setItem('token', response.data.access);
            navigate('/quiz');
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid username or password'); // 设置错误消息
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            {error && <p className={styles.errorMessage}>{error}</p>} {/* 显示错误消息 */}
            <input
                type="text"
                placeholder="姓名-computingID"
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
            <button onClick={handleLogin} className={styles.button}>Login</button>
            <p className={styles.linkText}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;
