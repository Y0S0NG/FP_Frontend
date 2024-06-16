// src/components/Quiz.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get('/api/questions/');
            setQuestions(response.data);
        };
        fetchQuestions();
    }, []);

    const handleAnswer = (questionId, choiceId) => {
        setAnswers({ ...answers, [questionId]: choiceId });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('/api/results/', answers, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // Handle post submission logic
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
