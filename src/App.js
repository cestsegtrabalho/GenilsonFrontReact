import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loja from "./assets/js/loja";
import ListProduct from "./assets/js/listProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota para a página de perfil do usuário */}
        <Route path="/:username" element={<Loja/>} />
        {/* Outras rotas da sua aplicação */}
      </Routes>
    </Router>
  );
};

export default App;

