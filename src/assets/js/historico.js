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
            const responseUser = await axios.get(`https://api.cestsegtrabalho.com.br/${username}`);
            setUserData(responseUser.data);
        } catch (error) {
            console.error("Erro ao buscar os dados da loja: ", error);
        }
    };


    // Pega as perimetrias do usuário
    const fetchPerimetrias = async () => {
        try {
            const responsePerimetrias = await axios.get(`https://api.cestsegtrabalho.com.br/perimetria/${userData._id}`);
            setPerimetrias(responsePerimetrias.data.reverse());
        } catch (error) {
            console.error("Erro ao buscar as perimetrias do usuário: ", error);
        }
    };

    // Pega as dobras cutâneas do usuário
    const fetchDobrasCutaneas = async () => {
        try {
            const responseDobrasCutaneas = await axios.get(`https://api.cestsegtrabalho.com.br/dobrascutaneas/tudo`);
            setDobrasCutaneas(responseDobrasCutaneas.data.reverse());
        } catch (error) {
            console.error("Erro ao buscar as dobras cutâneas do usuário: ", error);
        }
    };

    useEffect(() => {
        fetchLoja();
    }, [username]);

    useEffect(() => {
            fetchDobrasCutaneas();
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
                    <h4>Provas feitas recentemente</h4>
                        {dobrascutaneas.map((dobra) => (
                            <div key={dobra._id}>
                                {/* Exibir os dados das dobras cutâneas */}
                                {/* Exemplo: */}
                                <p><b>{moment(dobra.createdAt).format('DD/MM/YYYY HH:mm:ss')}</b> </p>
                                <p><b>Prova:</b> {dobra.abdominal}</p>
                                <p><b>Aluno:</b> {dobra.subescapular}</p> 
                                {/* Adicionando condição para mostrar mais dados quando o botão for clicado */}
                                {selectedDobra === dobra && (
                                    <>
                                        <p><b>email:</b> {dobra.peitoral}</p>
                                        <p><b>tel:</b> {dobra.triciptal}</p>        
                                    

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
                    
                    {/* <div className="item-history">
                    <h3></h3>
                        {perimetrias.map((perimetria) => (
                            <div key={perimetria._id}>
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
                               
                                <button onClick={() => handleShowMorePerimetria(perimetria)} className="button-history">
                                    {selectedPerimetria === perimetria ? "Mostrar Menos" : "Mostrar Mais"}
                                </button>
                            </div>
                        ))}
                    </div> */}
                </div>
                
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    );
}

export default History