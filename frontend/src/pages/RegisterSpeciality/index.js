import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

export default function RegisterCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get('category').then(response => {
            setCategories(response.data);
        });

    });

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro de Especialidades</h1>
                </section>
                <form>
                    <select>
                        <option value="">Selecione a Categoria</option>
                        {
                            categories.map(category => (
                                <option value="{categoy.id}">{category.name}</option>                                    
                            ))
                        }
                    </select>
                    <input placeholder="Digite o nome da Especialidade"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}