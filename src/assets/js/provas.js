import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompartilharSimples from "./CompartilharSimples";

const Provas = () => {
    const [provas, setProvas] = useState([]);
    const [editProvaId, setEditProvaId] = useState(null);
    const [editTitulo, setEditTitulo] = useState('');
    const [editUrlProva, setEditUrlProva] = useState('');
    const [questoes, setQuestoes] = useState({}); // Alterado para suportar diferentes arrays de questões
    const [nameUrl, setNameUrl] = useState()

    useEffect(() => {
        fetchProvas();
    }, []);

    const fetchProvas = async () => {
        try {
            const response = await axios.get('https://api.cestsegtrabalho.com.br/treino/buscar');
            setProvas(response.data);
            setNameUrl(response.data.nameUrl)
            console.log('teste', nameUrl)
        } catch (error) {
            console.error('Erro ao buscar provas:', error);
        }
    };

    const handleEdit = (prova) => {
        setEditProvaId(prova._id);
        setEditTitulo(prova.nameProva);
        setEditUrlProva(prova.nameUrl);
        setQuestoes({
            treino1: prova.treino1 || [],
            treino2: prova.treino2 || [],
            treino3: prova.treino3 || [],
            treino4: prova.treino4 || [],
            treino5: prova.treino5 || []
        });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `${token}` } };
            const response = await axios.patch(`https://api.cestsegtrabalho.com.br/treino/${editProvaId}`, {
                nameProva: editTitulo,
                nameUrl: editUrlProva,
                treino1: questoes.treino1,
                treino2: questoes.treino2,
                treino3: questoes.treino3,
                treino4: questoes.treino4,
                treino5: questoes.treino5
            }, config);
            setProvas(provas.map(prova => prova._id === editProvaId ? response.data : prova));
            setEditProvaId(null);
            setEditTitulo('');
            setEditUrlProva('');
            setQuestoes({});
        } catch (error) {
            console.error('Erro ao atualizar prova:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `${token}` } };
            await axios.delete(`https://api.cestsegtrabalho.com.br/treino/${id}`, config);
            setProvas(provas.filter(prova => prova._id !== id));
        } catch (error) {
            console.error('Erro ao deletar prova:', error);
        }
    };

    const handleShare = (url, nameprova) => {
        const mensagem = `*PROVA ${nameprova}* \n\n${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappUrl, '_blank');
    };

    // const handleShare = (url) => {
    //     if (url) {
    //         const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    //         window.open(whatsappUrl, '_blank');
    //     } else {
    //         console.error('URL inválida para compartilhar:', url);
    //     }
    // };

    const handleQuestionChange = (treinoType, index, field, value) => {
        setQuestoes(prevQuestoes => {
            const updatedQuestoes = { ...prevQuestoes };
            updatedQuestoes[treinoType][index] = {
                ...updatedQuestoes[treinoType][index],
                [field]: value
            };
            return updatedQuestoes;
        });
    };

    const handleAddQuestion = (treinoType) => {
        setQuestoes(prevQuestoes => ({
            ...prevQuestoes,
            [treinoType]: [...(prevQuestoes[treinoType] || []), { grupoMuscular: '', exercicio: '', series: '', repeticoes: '' }]
        }));
    };

    const handleOptionChange = (treinoType, questionIndex, optionIndex, value) => {
        setQuestoes(prevQuestoes => {
            const updatedQuestoes = { ...prevQuestoes };
            updatedQuestoes[treinoType][questionIndex] = {
                ...updatedQuestoes[treinoType][questionIndex],
                [optionIndex]: value
            };
            return updatedQuestoes;
        });
    };

    return (
        <div id='prova-father'>
            <h1>Provas</h1>
            <ul>
                {provas.map(prova => (
                    <li key={prova._id}>
                        {editProvaId === prova._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTitulo}
                                    onChange={(e) => setEditTitulo(e.target.value)}
                                    placeholder="Título da Prova"
                                />
                                <input
                                    type="text"
                                    value={editUrlProva}
                                    onChange={(e) => setEditUrlProva(e.target.value)}
                                    placeholder="URL da Prova"
                                />
                                <br />
                                {['treino1', 'treino2', 'treino3', 'treino4', 'treino5'].map(treinoType => (
                                    <div key={treinoType}>
                                        <h2>{treinoType}</h2>
                                        {questoes[treinoType]?.map((questao, index) => (
                                            <div key={index}>
                                                <input
                                                    className='inputs'
                                                    type="text"
                                                    value={questao.grupoMuscular}
                                                    onChange={(e) => handleQuestionChange(treinoType, index, 'grupoMuscular', e.target.value)}
                                                    placeholder={`Grupo Muscular ${index + 1}`}
                                                />
                                                <input
                                                    className='inputs'
                                                    type="text"
                                                    value={questao.exercicio}
                                                    onChange={(e) => handleQuestionChange(treinoType, index, 'exercicio', e.target.value)}
                                                    placeholder={`Exercício ${index + 1}`}
                                                />
                                                <input
                                                    className='inputs'
                                                    type="text"
                                                    value={questao.series}
                                                    onChange={(e) => handleQuestionChange(treinoType, index, 'series', e.target.value)}
                                                    placeholder={`Séries ${index + 1}`}
                                                />
                                                <input
                                                    className='inputs'
                                                    type="text"
                                                    value={questao.repeticoes}
                                                    onChange={(e) => handleQuestionChange(treinoType, index, 'repeticoes', e.target.value)}
                                                    placeholder={`Repetições ${index + 1}`}
                                                />
                                                <br />
                                                {/* <button onClick={() => handleAddQuestion(treinoType)}>Adicionar Pergunta</button> */}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <button onClick={handleUpdate}>Salvar</button>
                                <button onClick={() => setEditProvaId(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                <span>Título: {prova.nameProva}</span>
                                <br />
                                <span>URL: {prova.linkUrl}</span>
                                <br />
                                <button onClick={() => handleEdit(prova)}>Editar</button>
                                <button onClick={() => handleDelete(prova._id)}>Deletar</button>
                                <button onClick={() => handleShare(prova.linkUrl, prova.nameProva)}>Compartilhar</button>
                                <CompartilharSimples linkUrl={prova.linkUrl} nameprova={prova.nameProva} /> {/* Usar o componente */}

                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Provas;
