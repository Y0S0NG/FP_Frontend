// src/components/Quiz.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
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
            await axios.post('/api/submit_quiz/', { answers }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate('/result');
        } catch (error) {
            console.error('Error submitting quiz', error);
        }
    };

    return (
        <div>
            <h2>Quiz</h2>
            {questions.map((question) => (
                <div key={question.id}>
                    <p>{question.text}</p>
                    {question.choices.map((choice) => (
                        <button
                            key={choice.id}
                            onClick={() => handleAnswer(question.id, choice.id)}
                            style={{
                                backgroundColor: answers[question.id] === choice.id ? 'lightblue' : '',
                            }}
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Quiz;
