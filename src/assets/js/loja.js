import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Loja = () => {
    const { username } = useParams();
    const [userid, setUserId] = useState("");
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseUser = await axios.get(`http://localhost:8080/${username}`);
                const userId = responseUser.data._id;
                setUserData(responseUser.data);
                setUserId(userId);

                const responseProducts = await axios.get(`http://localhost:8080/produtos/user/${userId}`);
                setProducts(responseProducts.data);
                
                const responseCategories = await axios.get(`http://localhost:8080/categorias/user/${userId}`);
                setCategories(responseCategories.data);
            } catch (error) {
                console.error("Erro ao buscar os dados da loja e o id da loja: (FetchUseDATA) ", error);
            }
        };

        fetchData();
    }, [username]);

    const handleCategoryChange = async (categoryId) => {
        try {
            setSelectedCategory(categoryId);
            if (categoryId) {
                const response = await axios.get(`http://localhost:8080/produtos/${categoryId}/${userid}`);
                setProducts(response.data);
                console.log('Sucesso ao buscar produtos por categoria no MongoDB')
            } else {
                const response = await axios.get(`http://localhost:8080/produtos/user/${userid}`);
                setProducts(response.data);
                console.log('Sucesso 2 ao buscar produtos por categoria no MongoDB')
            }
        } catch (error) {
            console.error("Erro ao buscar produtos por categoria", error);
        }
    };

    const addToCart = (productNome, productDescricao, productTamanhos, productSabores, productPreco) => {
        axios.post('http://localhost:8080/pedidos', {
            nome: productNome,
            descricao: productDescricao,
            tamanhos: productTamanhos,
            sabores: productSabores,
            preco: productPreco,
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Erro ao adicionar ao carrinho', error)
        })
    };

    return (
        <div className="father-loja">
            {userData ? (
                <div>
                    <img src={userData.imageUrl} className=""/>
                    <h1>{userData.name}</h1>
                    <p>Email: {userData.email}</p>
                    <p>Endereço: {userData.endereco}</p>
                    <div>
                         <h1>Nossos Produtos</h1>
                        <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                            <option value="">Todas as Categorias</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.nome}</option>
                            ))}
                        </select>

                        {categories.map(category => (
                            <div key={category._id}>
                            <h2>{category.nome}</h2>
                            {products
                                .filter(product => product.categoria === category._id)
                                .map((product) => (
                                <div key={product._id}>
                                    <p>{product.imageUrl}</p>
                                    <p>{product.nome}</p>
                                    <p>{product.descricao}</p>
                                    <p>R${product.preco}</p>
                                    <div>
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        {product.tamanhos.map((tamanho, index) => (
                                        <li key={index}>{tamanho}</li>
                                        ))}
                                    </ul>
                                    </div>
                                    <div>
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        {product.sabores.map((sabor, index) => (
                                        <li key={index}>{sabor}</li>
                                        ))}
                                    </ul>
                                    </div>
                                    <button onClick={() => addToCart(product.nome, product.descricao, product.tamanhos, product.sabores, product.preco)}>Colocar no Carrinho</button>
                                </div>
                                ))}
                            </div>
                        ))}
                    </div>


                </div>
            ) : (
                <p>Carregando...</p>
            )}
            
        </div>
    );
};

export default Loja;
