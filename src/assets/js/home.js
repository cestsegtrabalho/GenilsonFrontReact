import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaDumbbell, FaUserCircle } from 'react-icons/fa';
import { GrHomeRounded } from "react-icons/gr";
import { GoHistory } from "react-icons/go";
import { LiaDumbbellSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";
import Dados from "./dados";
import History from "./historico";
import TreinoCompleto from "./treinoCompletos";
import LoginUser from "./loginUser";
import ResetPasswordRequest from "./resetPasswordrequest";
import MensagemLogar from "../js/mensagemLogar";

const Home = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [componente, setComponente] = useState(<Dados />);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const buttonHistory = () => {
        setComponente(<History />);
    }

    const buttonDados = () => {
        setComponente(<Dados />);
    }

    const buttonTreino = () => {
        setComponente(<TreinoCompleto />);
    }

    // Pega os dados da loja
    const fetchData = async () => {
        try {
            const responseUser = await axios.get(`https://15.228.166.75/${username}`);
            setUserData(responseUser.data);
        } catch (error) {
            console.error("Erro ao buscar os dados da loja: ", error);
        }
    };

    const fetchDataToken = async () => {
        try {
            const responseUserToken = await axios.get(`https://15.228.166.75/protected/user/buscar`, {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            })
            setIsLoggedIn(true);
            console.log('Rota acessada com sucesso');
        } catch (error) {
            setIsLoggedIn(false);
            console.error('Erro ao acessar rota');
        }
    }

    const clearLocalStorage = () => {
        localStorage.clear();
        window.location.reload()
    };
    

    useEffect(() => {
        fetchDataToken();
        fetchData();
    }, [username]);

    return (
        <div className="father-home">
            <div>
                {!isLoggedIn && (
                    <MensagemLogar />
                )}
            </div>

            {userData ? (
                <div>
                    {/* <div className="user-profile">
                        <div className="profile-info">
                            <FaUserCircle className="profile-icon" />
                            <div className="user-info">
                                <h3>{userData.name}</h3>
                                <p>@{userData.username}</p>
                            </div>
                        </div>
                        <div className="settings">
                            <button className="bottom-bar-button" onClick={clearLocalStorage}>
                            <IoIosLogOut className="profile-icon-logout" />
                            </button>
                        </div>
                    </div> */}

                    {componente}
                    <div className="bottom-bar">
                        
                            <button className="bottom-bar-button" onClick={buttonDados}>
                                <GrHomeRounded className="icone-buttonbar"/> 
                            </button>
                            <button className="bottom-bar-button" onClick={buttonHistory}>
                                <GoHistory className="icone-buttonbar"/> 
                            </button>
                            <button className="bottom-bar-button" onClick={buttonTreino}>
                                <LiaDumbbellSolid className="icone-buttonbar-dumbble"/> 
                            </button>
                        
                    </div>
                </div>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    );
};

export default Home;
