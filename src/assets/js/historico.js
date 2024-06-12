import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from 'moment';

const History = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [perimetrias, setPerimetrias] = useState([]);
    const [dobrascutaneas, setDobrasCutaneas] = useState([]);
    const [selectedDobra, setSelectedDobra] = useState(null); // Adicionando estado para controlar qual dobra está selecionada
    const [selectedPerimetria, setSelectedPerimetria] = useState(null); // Adicionando estado para controlar qual perimetria está selecionada

    // Pega os dados da loja
    const fetchLoja = async () => {
        try {
            const responseUser = await axios.get(`http://192.168.247.103:8080/${username}`);
            setUserData(responseUser.data);
        } catch (error) {
            console.error("Erro ao buscar os dados da loja: ", error);
        }
    };


    // Pega as perimetrias do usuário
    const fetchPerimetrias = async () => {
        try {
            const responsePerimetrias = await axios.get(`http://192.168.247.103:8080/perimetria/${userData._id}`);
            setPerimetrias(responsePerimetrias.data.reverse());
        } catch (error) {
            console.error("Erro ao buscar as perimetrias do usuário: ", error);
        }
    };

    // Pega as dobras cutâneas do usuário
    const fetchDobrasCutaneas = async () => {
        try {
            const responseDobrasCutaneas = await axios.get(`http://192.168.247.103:8080/dobrascutaneas/${userData._id}`);
            setDobrasCutaneas(responseDobrasCutaneas.data.reverse());
        } catch (error) {
            console.error("Erro ao buscar as dobras cutâneas do usuário: ", error);
        }
    };

    useEffect(() => {
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
        <div className="father-historico">
            {userData ? (
                <div className="father-item">
                    {/* Exibir as dobras cutâneas */}
                    
                    <div className="item-history">
                    <h3>Dobras Cutâneas</h3>
                        {dobrascutaneas.map((dobra) => (
                            <div key={dobra._id}>
                                {/* Exibir os dados das dobras cutâneas */}
                                {/* Exemplo: */}
                                <p><b>{moment(dobra.createdAt).format('DD/MM/YYYY')}</b> </p>
                                <p><b>% de Gordura:</b> {dobra.resultadopercentualdegordura}%</p>
                                <p><b>Peso atual:</b> {dobra.pesoatual}kg</p>
                                
                                {/* Adicionando condição para mostrar mais dados quando o botão for clicado */}
                                {selectedDobra === dobra && (
                                    <>
                                    <p><b>Peitoral:</b> {dobra.peitoral}</p>
                                    <p><b>Axilar Média:</b> {dobra.axilarmedia}</p>
                                    <p><b>Triciptal:</b> {dobra.triciptal}</p>
                                    <p><b>Subescapular:</b> {dobra.subescapular}</p>
                                    <p><b>Abdominal:</b> {dobra.abdominal}</p>
                                    <p><b>Suprailiaca:</b> {dobra.suprailiaca}</p>
                                    <p><b>Coxa:</b> {dobra.coxa}</p>
                                    <p><b>Biciptal:</b> {dobra.biciptal}</p>
                                    <p><b>Panturrilha Média:</b> {dobra.panturrilhaMedia}</p>
                                    <p><b>Somatório das dobras:</b> {dobra.somatoriodasdobras}</p>
                                    <p><b>Idade:</b> {dobra.idade}</p>

                                    </>
                                )}
                                {/* Botão para mostrar mais ou menos dados */}
                                <button onClick={() => handleShowMoreDobra(dobra)} className="button-history">
                                    {selectedDobra === dobra ? "Mostrar Menos" : "Mostrar Mais"}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Exibir as perimetrias */}
                    
                    <div className="item-history">
                    <h3>Medidas</h3>
                        {perimetrias.map((perimetria) => (
                            <div key={perimetria._id}>
                                
                                {/* Adicionando condição para mostrar mais dados quando o botão for clicado */}
                                <p><b>{moment(perimetria.createdAt).format('DD/MM/YYYY')}</b> </p>
                                {selectedPerimetria === perimetria && (
                                    <>
                                    <p><b>Braço relaxado esquerdo:</b> {perimetria.bracoRelaxadoEsquerdo}cm</p>
                                    <p><b>Braço relaxado direito:</b> {perimetria.bracoRelaxadoDireito}cm</p>
                                    <p><b>Braço contraído esquerdo:</b> {perimetria.bracoContraidoEsquerdo}cm</p>
                                    <p><b>Braço contraído direito:</b> {perimetria.bracoContraidoDireito}cm</p>
                                    <p><b>Antebraço esquerdo:</b> {perimetria.antebracoEsquerdo}cm</p>
                                    <p><b>Antebraço direito:</b> {perimetria.antebracoDireito}cm</p>
                                    <p><b>Perna esquerda:</b> {perimetria.pernaEsquerdo}cm</p>
                                    <p><b>Perna direita:</b> {perimetria.pernaDireito}cm</p>
                                    <p><b>Torax:</b> {perimetria.torax}cm</p>
                                    <p><b>Abdomen:</b> {perimetria.abdomen}cm</p>
                                    <p><b>Quadril:</b> {perimetria.quadril}cm</p>
                                    </>
                                )}
                                {/* Botão para mostrar mais ou menos dados */}
                                <button onClick={() => handleShowMorePerimetria(perimetria)} className="button-history">
                                    {selectedPerimetria === perimetria ? "Mostrar Menos" : "Mostrar Mais"}
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    );
}

export default History