import React from 'react';
import { useNavigate } from 'react-router-dom';

const MensagemLogar = () => {
    const navigate = useNavigate()

    const redirectLogin = () => {
        navigate('/login')
    }

    return (
        <div className="alert-container">
            <p>Fazer login ou Primeiro acesso</p>
            <button className="login-button" onClick={redirectLogin}>Login</button>
        </div>
    );
}

export default MensagemLogar;
