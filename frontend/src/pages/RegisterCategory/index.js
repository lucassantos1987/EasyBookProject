import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function RegisterCategory() {
    const [name, setName] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name
        };

        try {
            await api.post('category', data);            
            alert('Categoria gravada com sucesso.');
        } catch (err) {
            alert('Erro no cadastro. Tente novamente.');
        }
    }

    return(
        <div className="category-container">
            <div className="header">
                <h1>Painel Administrativo EasyBook</h1>
            </div>
            <div className="content">
                <section>
                    <h1>Cadastro de Categorias</h1>
                    <form onSubmit={handleRegister}>
                        <input 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Digite o nome da Categoria"/>

                        <button className="button" type="submit">Cadastrar</button>
                    </form>

                    <Link className="back-link" to="/">Voltar para Menu</Link>
                </section>
            </div>
        </div>
    );
}