import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/js/home";
import ResetPassword from "./assets/js/resetPasswords"; // Importe o componente de redefinição de senha
import LoginUser from "./assets/js/loginUser";
import ResetPasswordRequest from "./assets/js/resetPasswordrequest";
import Login from "./assets/js/login";
import './assets/css/home.css';
import './assets/css/history.css';
import './assets/css/treinos.css';
import './assets/css/mensagemLogar.css'
import './assets/css/dados.css'
import './assets/css/createTreino.css'
import './assets/css/login.css'
import './assets/css/primeiroAcesso.css'
import './assets/css/resetPasswordrequest.css'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota para a página de perfil do usuário */}
        <Route path="/:username" element={<Home />} />
        {/* Rota para redefinição de senha */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Outras rotas da sua aplicação */}
        <Route path="/login" element={<LoginUser/>}></Route>
        {/* Outras rotas da sua aplicação */}
        <Route path="/redefinir-senha" element={<ResetPasswordRequest/>}></Route>
        {/* Outras rotas da sua aplicação */}
        <Route path="/loginPage" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
