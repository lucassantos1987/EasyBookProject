import React, { useState } from 'react';
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
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro de Categorias</h1>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Digite o nome da Categoria"
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}