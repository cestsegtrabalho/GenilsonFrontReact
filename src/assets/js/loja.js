import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ListProduct from "./listProduct";

const Loja = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${username}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados do usuário:", error);
            }
        }
        fetchUserData();
    }, [username]);

    return (
        <div>
            {userData ? (
                <div>
                    <h1>{userData.name}</h1>
                    <p>Email: {userData.email}</p>
                    <p>endereco: {userData.endereco}</p>
                    {/* Adicione outros detalhes do usuário conforme necessário */}
                    <ListProduct/>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
            
        </div>
    );
};

export default Loja;
