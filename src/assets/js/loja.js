import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Popup from "./modal";

const Loja = () => {
    const { username } = useParams();
    const [userid, setUserId] = useState("");
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [pedidosFromDB, setPedidosFromDB] = useState([])
    const [pedidos, setPedidos] = useState([])
    const [total, setTotal] = useState(0)
    const [showPopup, setShowPopup] = useState(false);

    // Pedido sem cadastro

    // Pedido com cadastro

    // Essas duas funções vão abrir e fechar o pop-up
    const openPopup = () => {
        setShowPopup(true);
    };
      
    const closePopup = () => {
    setShowPopup(false);
    };

    // Pega os dados da loja, produtos e categorias da loja
    const fetchData = async () => {
        try {
            // Pega os dados da loja
            const responseUser = await axios.get(`http://localhost:8080/${username}`);
            const userId = responseUser.data._id;
            setUserData(responseUser.data);
            setUserId(userId);
            
            // Pega os produtos da loja pelo ID
            const responseProducts = await axios.get(`http://localhost:8080/produtos/user/${userId}`);
            setProducts(responseProducts.data);
            
            // Pega as categorias da loja por ID
            const responseCategories = await axios.get(`http://localhost:8080/categorias/user/${userId}`);
            setCategories(responseCategories.data);
        } catch (error) {
            console.error("Erro ao buscar os dados da loja e o id da loja: (FetchUseDATA) ", error);
        }
    };

    // Pega os pedidos do usuário pelo ??
    const getPedidos = async () => {
        try {
            const responsePedidos = await axios.get(`http://localhost:8080/pedidos`)
            setPedidosFromDB(responsePedidos.data) // Recebe os pedidos
            const newTotal = responsePedidos.data.reduce((acc, pedidosFromDB) => acc + pedidosFromDB.preco, 0)
            setTotal(Number(newTotal))
            const novoPedido = responsePedidos.data.map((item) => ({
                nome: item.nome,
                descricao: item.descricao,
                preco: item.preco,
                sabores: item.sabores 
            }))
            setPedidos(novoPedido)
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    useEffect(() => {
        fetchData();
        getPedidos()
    }, [username]);

    // Lida com a mudança de categoria. Quando selecionamos uma categoria, exibe só os produtos da mesma
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

    // POST - Adiciona ao carrinho
    const addToCart = async (productNome, productDescricao, productTamanhos, productSabores, productPreco) => {
        openPopup()
        try {
            const response = await axios.post('http://localhost:8080/pedidos', {
            nome: productNome,
            descricao: productDescricao,
            tamanhos: productTamanhos,
            sabores: productSabores,
            preco: productPreco,
        })
        console.log('Sucesso ao adicionar no carrinho ', response.data)
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho', error)
        }
    };

// Fecha o pedido e envia pelo whatsapp
const sendWhatsapp = () => {
//Mensagem do whatsapp
var zap = "https://wa.me/5521992002356?text="
var tudoJunto = `
*PIZZARIA DO 7 DE ABRIL*
_Estrada Santa Eugênia, 3000 ${null}_
www.sistemadepedido/pizzaria7deabril.html

*Nome:* Stanley Lucas Chagas de Andrade 
*Telefone:* 21992002356
*Endereço:* Estrada Santa Eugênia, 3000. Bloco 9, apto 401

*Tempo de entrega:* até ${null} minutos 

*PEDIDOS:*
${pedidos.map(item => '*1x* ' +item.nome + ' R$' + item.preco + '\n' + item.descricao + ' ' + item.sabores).join('\n')}

*Método de pagamento:* ${null}
*Total:*

_Obs.: a taxa de entrega será passada pelo atendente. Agradecemos pela preferência. Obrigado._
`;    
    
tudoJunto = window.encodeURIComponent(tudoJunto); //Transforma em texto de Whatsapp
    
var codigoTodo = zap + tudoJunto; //Concatena e exibe
window.open(codigoTodo, '_self')
}

    // Deleta o pedido do usuário por id
    const DeleteItem = (productId) => {
        axios.delete(`http://localhost:8080/pedidos/${productId}`)
        .then(() => {
            getPedidos()
            console.log('Item apagado com sucesso')
        })
        .catch((error) => {
            console.log('Deu erro ao apagar: ', error)
            console.log(productId)
        })
    }

    // Deleta todos os pedidos do usuário final
    const DeleteAll = () => {
        axios.delete(`http://localhost:8080/pedidos`)
        .then(() => {
            getPedidos()
            console.log('Tudo apagado com sucesso')
        })
        .catch((error) => {
            console.log('Deu erro ao apagar tudo: ', error)
        })
    }

    return (
        <div className="father-loja">
            {userData ? (
                <div>
                    <div className="divInfoloja-loja">
                        <img src={userData.imageUrl} className="logo-loja"/>
                        <h2 className="info-loja">{userData.name}</h2>
                        <p className="info-loja">{userData.endereco}</p>
                        <p className="info-loja">Whatsapp: {userData.phone}</p>
                        <p className="info-loja">Horário de funcionamento: {userData.horarioDeFuncionamento}</p>
                    </div>
                    <Popup isOpen={showPopup} onClose={closePopup}>
                    <h2>Adicionar Observação</h2>
                    <input type="text" placeholder="Digite sua observação..." />
                    <button onClick={closePopup}>Adicionar ao Carrinho</button>
                    </Popup>
                    <div className="div-meusProdutos-meusPedidos">
                        <div className="meus-produtos">
                            <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="select-categorias-loja" >
                                <option value="" className="option-categorias-loja">Todas as Categorias</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.nome}</option>
                                ))}
                            </select>

                            {categories.map(category => (
                                <div key={category._id}>
                                <h2>{category.nome}</h2>
                                <div className="product-container">
                                    {products.filter(product => product.categoria === category._id)
                                    .map((product) => (
                                    <div key={product._id} className="product-item" >
                                        <div className="divContent-productItem">
                                            <p><b>{product.nome}</b></p>
                                            <p className="truncate-text">{product.descricao}</p>
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
                                            <button onClick={() => addToCart(product.nome, product.descricao, product.tamanhos, product.sabores, product.preco)} className="editButton-manageProduct">Colocar no Carrinho</button>
                                        </div>
                                        <div className="divImg-productItem">
                                            <img src={product.imageUrl} className="img-product-manageProduct"/>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            ))}
                        </div>

                        <div className="meus-pedidos">
                            <span id="teste"></span>
                            <h1>Seu carrinho</h1>
                            <span id="showcart"></span>
                            {pedidosFromDB.map((pedidos) => (
                            <div key={pedidos._id}>
                            <p>{pedidos.nome}</p>
                            <p>{pedidos.descricao}</p>
                            <p>{pedidos.tamanhos}</p>
                            <p>{pedidos.sabores}</p>
                            <p>R${pedidos.preco}</p>
                            <input type="text" placeholder="Digite as obervações aqui"></input>
                            <button onClick={() => DeleteItem(pedidos._id)}>Tirar item do carrinho</button>
                            
                            <p>______________________</p>
                            {/* Renderize outros detalhes do produto */}
                            </div>
                            ))}
                            <p>Total: R${total}</p>
                            <button onClick={getPedidos}>Atualizar Carrinho</button><br/>
                            <button onClick={DeleteAll}>Esvaziar Carrinho</button><br/>
                            <button onClick={sendWhatsapp}>Fazer pedido</button><br/>
                        </div>
                    </div>
                </div>
                

                
            ) : (
                <p>Carregando...</p>
            )}

            
        </div>
    );
};

export default Loja;
