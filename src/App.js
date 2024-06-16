import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Register from './components/Register';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/result" element={<Result />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;




