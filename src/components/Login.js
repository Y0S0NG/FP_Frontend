import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';  // 使用CSS模块化
import ErrorModal from './ErrorModal';    // 引入ErrorModal组件

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // 添加错误状态
    const [showGIF, setShowGIF] = useState(true); // 管理 GIF 的显示状态
    const [showIMG, setShowIMG] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/token/', { username, password });
            localStorage.setItem('token', response.data.access);
            navigate('/quiz');
        } catch (error) {
            console.error('Login failed', error);
            setError('用户名或密码错误'); // 设置错误消息
        }
    };

    const handleGIFClick = () => {
        setShowGIF(false);
    };

    const handleIMGClick = () => {
        setShowIMG(false);
    };

    const closeErrorModal = () => {
        setError(''); // 清除错误消息
    };

    return (
        <div className={styles.loginContainer}>
            {showGIF && (
                <div className={styles.gifOverlay} onClick={handleGIFClick}>
                    <img src={`${process.env.PUBLIC_URL}/animation.gif`} className={styles.gif} alt="Animation" />
                </div>
            )}
            {showIMG && (
                <div className={styles.imgOverlay} onClick={handleIMGClick}>
                    <img src={`${process.env.PUBLIC_URL}/families.png`} className={styles.gif} alt="IMG" />
                </div>
            )}
            <h2>登录</h2>
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

            <ErrorModal message={error} onClose={closeErrorModal} />
        </div>
    );
}

export default Login;
