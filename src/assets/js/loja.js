import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ListProduct from "./listProduct";

const Loja = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${username}`);
                setUserData(response.data);
                // Chamar a rota para buscar os produtos do usuário
                const userProductsResponse = await axios.get(`http://localhost:8080/produtos/user/${response.data.userid}`);
                setProducts(userProductsResponse.data);
                // Chamar a rota para buscar as categorias do usuário
                const userCategoriesResponse = await axios.get(`http://localhost:8080/categorias/user/${response.data.userid}`);
                setCategories(userCategoriesResponse.data);
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
                    <p>Endereço: {userData.endereco}</p>
                    {/* Adicione outros detalhes do usuário conforme necessário */}
                    <ListProduct products={products} categories={categories} />
                </div>
            ) : (
                <p>Carregando...</p>
            )}
            
        </div>
    );
};

export default Loja;
