import React, { useEffect, useState } from "react";
import { FaHome, FaHistory, FaDumbbell } from 'react-icons/fa'; // Importando ícones
import DisplayTreinos from "./displaytreinos";
import TreinoGym from "./treinogym";
import CreateTreino from "./createTreino";

const TreinoCompleto = () => {
    const [componente, setComponente] = useState();
    const [userData, setUserData] = useState(null);

    const treinoProvisorio = () => {
        setComponente(<TreinoGym />);
    }

    const treinoAcademia = () => {
        setComponente(<DisplayTreinos />);
    }

    const criarTreino = () => {
        setComponente(<CreateTreino />);
    }

    return (
        <div className="father-treino">
            <div className="children-Treino-Completo">
                <button className="bottom-bar-button-treino" onClick={treinoAcademia}>
                    <FaDumbbell className="icon" />
                    <span>Seus Treinos</span>
                </button>
                <button className="bottom-bar-button-treino" onClick={treinoProvisorio}>
                    <FaDumbbell className="icon" />
                    <span>Treino Provisório</span>
                </button>
                <button className="bottom-bar-button-treino" onClick={criarTreino}>
                    <FaDumbbell className="icon" />
                    <span>Criar Treino</span>
                </button>
            </div>
            <div className="componente-container">
                {componente}
            </div>
        </div>
    )
}

export default TreinoCompleto;
