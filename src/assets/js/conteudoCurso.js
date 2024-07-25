import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/logo.png';

const Curso = () => {
    const { nameUrl } = useParams();
    const [curso, setCurso] = useState(null);
    const [error, setError] = useState(null);

    const fetchCurso = async () => {
        try {
            const response = await axios.get(`https://api.cestsegtrabalho.com.br/curso/${nameUrl}`);
            setCurso(response.data);
        } catch (error) {
            setError('Erro ao buscar os dados do curso');
            console.error('Erro ao buscar os dados do curso:', error);
        }
    };

    useEffect(() => {
        fetchCurso();
    }, [nameUrl]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!curso) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
                        <div id="questionario-img">
                <img id="img" src={logo} alt="Logo" />
            </div>
            <h1>{curso.titulo}</h1>
            <p>{curso.conteudo}</p>
            <div dangerouslySetInnerHTML={{ __html: curso.conteudo }} />
        </div>
    );
};

export default Curso;
