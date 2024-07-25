import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateCurso = () => {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [nameUrl, setNameUrl] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const fetchDataToken = async () => {
        try {
            const responseUserToken = await axios.get(`https://api.cestsegtrabalho.com.br/protected/user/buscar`, {
                headers: { Authorization: `${localStorage.getItem("token")}` }
            });
            setIsLoggedIn(true);
            console.log('Rota acessada com sucesso');
        } catch (error) {
            setIsLoggedIn(false);
            console.error('Erro ao acessar rota');
        }
    };

    useEffect(() => {
        fetchDataToken();
    }, []);

    const createCurso = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado, faça login novamente.');
                return;
            }
            const config = {
                headers: { Authorization: `${token}` }
            };

            const metadeUrl = 'https://app.cestsegtrabalho.com.br/curso/';
            const linkUrl = metadeUrl + nameUrl;
            const cursoData = { titulo, conteudo, nameUrl, linkUrl };
            
            try {
                await axios.post('https://api.cestsegtrabalho.com.br/curso/criar', cursoData, config);
                console.log('Curso cadastrado com sucesso');
                window.location.reload()
            } catch (error) {
                console.error('Erro ao criar curso: ', error);
            }
        } catch (error) {
            console.error('Erro ao criar curso: ', error);
        }
    };

    const goToLoginUser = () => {
        navigate('/login');
    };

    return (
        <div className="div-inputCurso">
            <form>
                <div>
                    <label htmlFor="titulo" className="labelnome-createCurso">Título do Curso:</label>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Digite o título do curso"
                        className='inputs'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="conteudo" className="labelnome-createCurso">Conteúdo do Curso:</label>
                    <ReactQuill
                        value={conteudo}
                        onChange={setConteudo}
                        placeholder="Digite o conteúdo do curso"
                        className="textarea-createCurso"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nameUrl" className="labelnome-createCurso">URL do Curso:</label>
                    <p>Minúsculo, tudo junto, sem espaço, ponto e vírgula</p>
                    <p>Ex.: www.cestsegtrabalho.com/curso/nomedocurso</p>
                    <input
                        type="text"
                        id="nameUrl"
                        value={nameUrl}
                        onChange={(e) => setNameUrl(e.target.value)}
                        placeholder="Digite a URL do curso"
                        className='inputs'
                        required
                    />
                </div>
                <br />
                {isLoggedIn ? (
                    <button type="button" onClick={createCurso} className="createButton-createCurso">Cadastrar Curso</button>
                ) : (
                    <div>
                        <p>Você só pode criar curso se estiver logado</p>
                        <button type="button" onClick={goToLoginUser} className="createButton-createCurso">Fazer Login ou Criar Conta</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateCurso;
