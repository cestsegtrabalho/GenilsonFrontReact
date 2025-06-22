import React, { useEffect, useState } from "react";
import { FaHome, FaHistory, FaDumbbell } from 'react-icons/fa'; // Importando ícones
import DisplayTreinos from "./displaytreinos";
import TreinoGym from "./treinogym";
import CreateTreino from "./createTreino";
import { BsBook } from "react-icons/bs";
import Questionario from "./questionario";
import CreateCurso from "./createCurso";
import Provas from "./provas";
import Cursos from "./curso";
import CreateGabarito from "./criarGabarito";
import Gabaritos from "./gabaritos";
import '../css/home.css'

const TreinoCompleto = () => {
    const [componente, setComponente] = useState();
    const [userData, setUserData] = useState(null);

    const cursos = () => {
        setComponente(<Cursos />);
    }

    const provas = () => {
        setComponente(<Provas />);
    }

    const createCurso = () => {
        setComponente(<CreateCurso />);
    }

    const criarQuiz = () => {
        setComponente(<CreateTreino />);
    }

    const criarGabarito = () => {
        setComponente(<CreateGabarito />);
    }

    const gabaritos = () => {
        setComponente(<Gabaritos />);
    }

    return (
        <div className="father-treino">
            <div className="children-Treino-Completo">
  <div className="button-row">
    <button className="bottom-bar-button-treino" onClick={cursos}>
      <BsBook className="icon" />
      <span>Seus Novos Cursos</span>
    </button>
    <button className="bottom-bar-button-treino" onClick={provas}>
      <BsBook className="icon" />
      <span>Suas Novas Provas</span>
    </button>
    <button className="bottom-bar-button-treino" onClick={gabaritos}>
      <BsBook className="icon" />
      <span>Seus Gabaritos</span>
    </button>
  </div>

  <div className="button-row criar-row">
    <button className="bottom-bar-button-treino" onClick={createCurso}>
      <BsBook className="icon" />
      <span>Criar Curso</span>
    </button>
    <button className="bottom-bar-button-treino" onClick={criarQuiz}>
      <BsBook className="icon" />
      <span>Criar Prova</span>
    </button>
    <button className="bottom-bar-button-treino" onClick={criarGabarito}>
      <BsBook className="icon" />
      <span>Criar Gabarito</span>
    </button>
  </div>
</div>

            <div className="componente-container">
                {componente}
            </div>
        </div>
    )
}

export default TreinoCompleto;
