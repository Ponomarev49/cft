import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage'; // Предположим, что эта страница существует

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/second" element={<SecondPage />} />
        </Routes>
    );
};

export default App;
