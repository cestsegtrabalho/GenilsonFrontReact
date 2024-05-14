import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/js/home";
import './assets/css/home.css'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota para a página de perfil do usuário */}
        <Route path="/:username" element={<Home/>} />
        {/* Outras rotas da sua aplicação */}
      </Routes>
    </Router>
  );
};

export default App;

