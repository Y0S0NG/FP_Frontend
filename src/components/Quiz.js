import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import styles from './Quiz.module.css';  // 使用CSS模块化
import ErrorModal from './ErrorModal';    // 引入ErrorModal组件

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
                setError('无法加载问题，请稍后再试。'); // 设置错误消息
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswer = (questionId, choiceId, isMultipleChoice) => {
        if (isMultipleChoice) {
            const currentAnswers = answers[questionId] || [];
            const updatedAnswers = currentAnswers.includes(choiceId)
                ? currentAnswers.filter(id => id !== choiceId)
                : [...currentAnswers, choiceId];
            setAnswers({ ...answers, [questionId]: updatedAnswers });
        } else {
            setAnswers({ ...answers, [questionId]: choiceId });
        }
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
                setError('提交测验时出错，请稍后再试。'); // 设置错误消息
            }
        }
    };

    const closeErrorModal = () => {
        setError(''); // 清除错误消息
    };

    return (
        <div>
            {error && <ErrorModal message={error} onClose={closeErrorModal} />} {/* 显示错误弹窗 */}
            <div className={styles.quizContainer}>
                <h2>请完成以下所有问题</h2>
                {questions.map((question) => (
                    <div key={question.id} className={styles.questionContainer}>
                        <p className={styles.questionText}>{question.text}</p>
                        <div className={styles.choicesContainer}>
                            {question.choices.map((choice) => (
                                <button
                                    key={choice.id}
                                    onClick={() => handleAnswer(question.id, choice.id, question.is_multiple_choice)}
                                    className={`${styles.choiceButton} ${question.is_multiple_choice ? (answers[question.id]?.includes(choice.id) ? styles.selected : '') : (answers[question.id] === choice.id ? styles.selected : '')}`}
                                >
                                    {choice.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
            </div>
        </div>
    );
}

export default Quiz;
