import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from 'moment';
import { FaDumbbell, FaUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";


const Dados = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [perimetrias, setPerimetrias] = useState([]);
    const [dobrascutaneas, setDobrasCutaneas] = useState([]);
    const [selectedDobra, setSelectedDobra] = useState(null); // Adicionando estado para controlar qual dobra está selecionada
    const [selectedPerimetria, setSelectedPerimetria] = useState(null); // Adicionando estado para controlar qual perimetria está selecionada
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Pega os dados da loja
    const fetchLoja = async () => {
        try {
            const responseUser = await axios.get(`https://api.fittreinoapp.com/${username}`);
            setUserData(responseUser.data);
        } catch (error) {
            console.error("Erro ao buscar os dados da loja: ", error);
        }
    };

    const fetchDataToken = async () => {
        try {
            const responseUserToken = await axios.get(`https://api.fittreinoapp.com/protected/user/buscar`, {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            });
            setIsLoggedIn(true);
            console.log('Rota acessada com sucesso');
        } catch (error) {
            setIsLoggedIn(false);
            console.error('Erro ao acessar rota');
        }
    };

    const clearLocalStorage = () => {
        localStorage.clear();
        window.location.reload();
    };

    // Pega as perimetrias do usuário
    const fetchPerimetrias = async () => {
        try {
            const responsePerimetrias = await axios.get(`https://api.fittreinoapp.com/perimetria/${userData._id}`);
            setPerimetrias(responsePerimetrias.data.reverse());
        } catch (error) {
            console.error("Erro ao buscar as perimetrias do usuário: ", error);
        }
    };

    // Pega as dobras cutâneas do usuário
    const fetchDobrasCutaneas = async () => {
        try {
            const responseDobrasCutaneas = await axios.get(`https://api.fittreinoapp.com/dobrascutaneas/${userData._id}`);
            setDobrasCutaneas(responseDobrasCutaneas.data.reverse());
        } catch (error) {
            console.error("Erro ao buscar as dobras cutâneas do usuário: ", error);
        }
    };

    useEffect(() => {
        fetchDataToken();
        fetchLoja();
    }, [username]);

    useEffect(() => {
        if (userData) {
            fetchPerimetrias();
            fetchDobrasCutaneas();
        }
    }, [userData]);

    const handleShowMoreDobra = (dobra) => {
        // Atualiza o estado para mostrar mais dados da dobra selecionada
        setSelectedDobra(selectedDobra === dobra ? null : dobra);
    };

    const handleShowMorePerimetria = (perimetria) => {
        // Atualiza o estado para mostrar mais dados da perimetria selecionada
        setSelectedPerimetria(selectedPerimetria === perimetria ? null : perimetria);
    };

    return (
        <div className="father-dados">
            {userData ? (
                <div>
                    <div className="user-profile">
                        <div className="profile-info">
                            <FaUserCircle className="profile-icon" />
                            <div className="user-info">
                                <h3>{userData.name}</h3>
                                <p>@{userData.username}</p>
                            </div>
                        </div>
                        <div className="settings">
                            {isLoggedIn && ( // Corrigido aqui
                                <button className="bottom-bar-button" onClick={clearLocalStorage}>
                                    <IoIosLogOut className="profile-icon-logout" />
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Exibir as dobras cutâneas */}
                    <h2 className="title-estado">Seu estado atual:</h2>
                    <div className="item">
                        {dobrascutaneas.slice(0, 1).map((dobra) => (
                            <ul key={dobra._id}>
                                {/* Exibir os dados das dobras cutâneas */}
                                {/* Exemplo: */}
                                <p><b>Criado em:</b> {moment(dobra.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                <p><b>Percentual de Gordura:</b> {dobra.resultadopercentualdegordura}%</p>
                                <p><b>Peso Atual:</b> {dobra.pesoatual}kg</p>
                                
                                {/* Adicionando condição para mostrar mais dados quando o botão for clicado */}
                                {/* {selectedDobra === dobra && (
                                    <>
                                        <p>Peso Ideal: {dobra.pesoideal}</p>
                                        <p>Peitoral: {dobra.peitoral}</p>
                                        <p>Axilar Média: {dobra.axilarmedia}</p>
                                        <p>Triciptal: {dobra.triciptal}</p>
                                        <p>Subescapular: {dobra.subescapular}</p>
                                        <p>Abdominal: {dobra.abdominal}</p>
                                        <p>Suprailiaca: {dobra.suprailiaca}</p>
                                        <p>Coxa: {dobra.coxa}</p>
                                        <p>Biciptal: {dobra.biciptal}</p>
                                        <p>Panturrilha Média: {dobra.panturrilhaMedia}</p>
                                        <p>Somatório das dobras: {dobra.somatoriodasdobras}</p>
                                        <p>Peso Gordo: {dobra.pesogordo}</p>
                                        <p>Peso Magro: {dobra.pesomagro}</p>
                                        <p>Idade: {dobra.idade}</p>
                                    </>
                                )} */}
                                {/* Botão para mostrar mais ou menos dados */}
                                {/* <button onClick={() => handleShowMoreDobra(dobra)} className="button-dados">
                                    {selectedDobra === dobra ? "Mostrar Menos" : "Mostrar Mais"}
                                </button> */}
                            </ul>
                        ))}
                    </div>

                    {/*     
                    <h2>Perimetrias:</h2>
                    <div className="item">
                        {perimetrias.slice(0, 1).map((perimetria) => (
                            <ul key={perimetria._id}>

                                {selectedPerimetria === perimetria && (
                                    <>
                                    <p><b>Criado em:</b> {moment(perimetria.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                    <p>Braço relaxado esquerdo: {perimetria.bracoRelaxadoEsquerdo}cm</p>
                                    <p>Braço relaxado direito: {perimetria.bracoRelaxadoDireito}cm</p>
                                    <p>Braço contraído esquerdo: {perimetria.bracoContraidoEsquerdo}cm</p>
                                    <p>Braço contraído direito: {perimetria.bracoContraidoDireito}cm</p>
                                    <p>Antebraço esquerdo: {perimetria.antebracoEsquerdo}cm</p>
                                    <p>Antebraço direito: {perimetria.antebracoDireito}cm</p>
                                    <p>Perna esquerda: {perimetria.pernaEsquerdo}cm</p>
                                    <p>Perna direita: {perimetria.pernaDireito}cm</p>
                                    <p>Torax: {perimetria.torax}cm</p>
                                    <p>Abdomen: {perimetria.abdomen}cm</p>
                                    <p>Quadril: {perimetria.quadril}cm</p>


                                    </>
                                )}
                                
                                <button onClick={() => handleShowMorePerimetria(perimetria)} className="editButton-manageProduct">
                                    {selectedPerimetria === perimetria ? "Mostrar Menos" : "Mostrar Mais"}
                                </button>
                            </ul>
                        ))}
                    </div>
                    */}
                    

                </div>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    );
}

export default Dados;
