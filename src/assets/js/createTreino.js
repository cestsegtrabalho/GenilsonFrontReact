import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateTreino = () => {
    const navigate = useNavigate();
    const [treino1, setTreino1] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino2, setTreino2] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino3, setTreino3] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino4, setTreino4] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino5, setTreino5] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino6, setTreino6] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [treino7, setTreino7] = useState([{ grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const handleInputChange = (index, event, setTreino, treino) => {
        const values = [...treino];
        values[index] = {
            ...values[index],
            [event.target.name]: event.target.value
        };
        setTreino(values);
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

    useEffect(() => {
        fetchDataToken()
    })

    const createTreino = async () => {
        try {
            const token = localStorage.getItem('token'); // Obtém o token do localStorage
            if (!token) {
                console.error('Token não encontrado, faça login novamente.');
                return;
            }

            const Userid = localStorage.getItem('AlunoUserid');
            const UserStoreid = localStorage.getItem('userStoreid');

            const config = {
                headers: { Authorization: token }
            };

            const treinoData = { treino1, treino2, treino3, treino4, treino5, treino6, treino7, userid: Userid};

            try {
                await axios.post('https://api.fittreinoapp.com/treino/criar', treinoData, config);
                console.log('Treino cadastrado com sucesso');
                //navigate('/algumaRotaParaRedirecionar'); // Redirecione para outra página após criar o treino
            } catch (error) {
                console.error('Erro ao criar Treino: ', error);
            }
        } catch (error) {
            console.error('Erro ao criar Treino: ', error);
        }
    };

    const addExerciseFields = (setTreino, treino) => {
        setTreino([...treino, { grupoMuscular: "", exercicio: "", series: "", repeticoes: "" }]);
    };

    const goToLoginUser = () => {
        navigate('/login')
    }

    return (
        <div className="div-inputTreino">
            <form>
                {[
                    { treino: treino1, setTreino: setTreino1, label: "Treino A" },
                    { treino: treino2, setTreino: setTreino2, label: "Treino B" },
                    { treino: treino3, setTreino: setTreino3, label: "Treino C" },
                    { treino: treino4, setTreino: setTreino4, label: "Treino D" },
                    { treino: treino5, setTreino: setTreino5, label: "Treino E" },
                    { treino: treino6, setTreino: setTreino6, label: "Treino F" },
                    { treino: treino7, setTreino: setTreino7, label: "Treino G" }
                ].map(({ treino, setTreino, label }, treinoIndex) => (
                    <div key={treinoIndex}>
                        <label htmlFor={`treino${treinoIndex + 1}`} className="labelnome-createProduct">{label}</label>
                        <br/>
                        {treino.map((field, index) => (
                            <div key={index} className="div-inputsTreino">
                                {index === 0 && (
                                    <input
                                        type="text"
                                        name="grupoMuscular"
                                        placeholder="Ex.: Peito e Tríceps"
                                        className="inputtext-createProduct"
                                        value={field.grupoMuscular}
                                        onChange={(e) => handleInputChange(index, e, setTreino, treino)}
                                    />
                                )} <br/>
                                <input
                                    type="text"
                                    name="exercicio"
                                    placeholder="Exercicio"
                                    className="inputtext-createProduct"
                                    value={field.exercicio}
                                    onChange={(e) => handleInputChange(index, e, setTreino, treino)}
                                />
                                <input
                                    type="text"
                                    name="series"
                                    placeholder="Series"
                                    className="inputtext-createProduct"
                                    value={field.series}
                                    onChange={(e) => handleInputChange(index, e, setTreino, treino)}
                                />
                                <input
                                    type="text"
                                    name="repeticoes"
                                    placeholder="Repetições"
                                    className="inputtext-createProduct"
                                    value={field.repeticoes}
                                    onChange={(e) => handleInputChange(index, e, setTreino, treino)}
                                />
                                <br />
                            </div>
                        ))}
                        <button type="button" onClick={() => addExerciseFields(setTreino, treino)} className="createButton-createProduct">+</button>
                        <br />
                    </div>
                ))}
                {isLoggedIn ? ( // Corrigido aqui
                    <button type="button" onClick={createTreino} className="createButton-createProduct">Cadastrar treino</button>
                ) : (
                    <div>
                        <p>Você só pode criar treino se estiver logado</p>
                        <button type="button" onClick={goToLoginUser} className="createButton-createProduct">Fazer Login ou Criar Conta</button>
                    </div>
                )}
                
            </form>
        </div>
    );
};

export default CreateTreino;
