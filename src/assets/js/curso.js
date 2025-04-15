import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // apagar
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Cursos = () => {
    const [cursos, setCursos] = useState([]);
    const [editCursoId, setEditCursoId] = useState(null);
    const [editTitulo, setEditTitulo] = useState('');
    const [editConteudo, setEditConteudo] = useState('');
    const [editNameUrl, setEditNameUrl] = useState('');
    const [editLinkUrl, setEditLinkUrl] = useState('')
    const [editUrlVideo, setEditUrlVideo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCursos();
    }, []);

    const fetchCursos = async () => {
        try {
            const response = await axios.get('https://api.cestsegtrabalho.com.br/curso/buscar');
            setCursos(response.data);
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
        }
    };

    const handleEdit = (curso) => {
        setEditCursoId(curso._id);
        setEditTitulo(curso.titulo);
        setEditConteudo(curso.conteudo);
        setEditNameUrl(curso.nameUrl);
        setEditLinkUrl(curso.linkUrl)
        setEditUrlVideo(curso.urlvideo)
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `${token}` } };
            const metadeUrl = 'https://app.cestsegtrabalho.com.br/curso/';
            const novolinkUrl = metadeUrl + editNameUrl;
            const response = await axios.patch(`https://api.cestsegtrabalho.com.br/curso/${editCursoId}`, { titulo: editTitulo, conteudo: editConteudo, nameUrl: editNameUrl, linkUrl: novolinkUrl, urlvideo: editUrlVideo }, config);
            setCursos(cursos.map(curso => curso._id === editCursoId ? response.data : curso));
            setEditCursoId(null);
            setEditTitulo('');
            setEditConteudo('');
            setEditNameUrl('');
            setEditLinkUrl('')
            setEditUrlVideo('');
        } catch (error) {
            console.error('Erro ao atualizar curso:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `${token}` } };
            await axios.delete(`https://api.cestsegtrabalho.com.br/curso/${id}`, config);
            setCursos(cursos.filter(curso => curso._id !== id));
        } catch (error) {
            console.error('Erro ao deletar curso:', error);
        }
    };

    const handleShare = (url, nomecurso) => {
        const mensagem = `CURSO ${nomecurso}\n\n${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappUrl, '_blank');
    };

    // const handleShare = (url) => {
    //     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    //     window.open(whatsappUrl, '_blank');
    // };

    return (
        <div id='cursos-father'>
            <h1>Cursos</h1>
            <ul>
                {cursos.map(curso => (
                    <li key={curso._id}>
                        {editCursoId === curso._id ? (
                            <div>
                                <input
                                    className='inputs'
                                    type="text"
                                    value={editTitulo}
                                    onChange={(e) => setEditTitulo(e.target.value)}
                                    placeholder="Título do Curso"
                                />
                                <input
                                    className='inputs'
                                    type="text"
                                    value={editUrlVideo}
                                    onChange={(e) => setEditUrlVideo(e.target.value)}
                                    placeholder="Url do Vídeo"
                                />
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={editConteudo}
                                    onChange={(event, editor) => setEditConteudo(editor.getData())}
                                    placeholder="Conteúdo do Curso"
                                />
                                <label>Escreva a URL do curso com letras minúsculas</label>
                                <input
                                    className='inputs'
                                    type="text"
                                    value={editNameUrl}
                                    onChange={(e) => setEditNameUrl(e.target.value)}
                                    placeholder="URL do Curso"
                                /><br />
                                <button onClick={handleUpdate}>Salvar</button>
                                <button onClick={() => setEditCursoId(null)}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                <span>Título: {curso.titulo}</span><br />
                                <span>URL: {curso.linkUrl}</span><br />
                                <button onClick={() => handleEdit(curso)}>Editar</button>
                                <button onClick={() => handleDelete(curso._id)}>Deletar</button>
                                <button onClick={() => handleShare(curso.linkUrl, curso.titulo)}>Compartilhar no WhatsApp</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cursos;
