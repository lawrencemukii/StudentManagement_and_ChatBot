import StudentManager from './components/StudentManager'
import Chatbot from './pages/Chatbot';
import HomePage from './pages/homepage';

//import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link }

from "react-router-dom";



function App() {
  //const [count, setCount] = useState(0)

  return (
    /*
    <div>
        <StudentManager />
    </div>
    */
    <BrowserRouter>
      <Link to="/Chatbot" />
      <Link to="/" />

      <Routes>
        <Route path="/Chatbot" element={<Chatbot />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/StudentManager" element={<StudentManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
