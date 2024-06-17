// src/components/Quiz.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';  // 引入CSS文件

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('/api/questions/');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions', error);
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswer = (questionId, choiceId) => {
        setAnswers({ ...answers, [questionId]: choiceId });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/submit_quiz/', { answers }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data); // 处理响应数据
            navigate('/result'); // 提交后跳转到结果页面
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error); // 设置错误消息
            } else {
                console.error('Error submitting quiz', error);
            }
        }
    };

    return (
        <div className="quiz-container">
            <h2>分院测试</h2>
            {error && <p className="error-message">{error}</p>}
            {questions.map((question) => (
                <div key={question.id} className="question-container">
                    <p className="question-text">{question.text}</p>
                    <div className="choices-container">
                        {question.choices.map((choice) => (
                            <button
                                key={choice.id}
                                onClick={() => handleAnswer(question.id, choice.id)}
                                className={`choice-button ${answers[question.id] === choice.id ? 'selected' : ''}`}
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
    );
}

export default Quiz;
