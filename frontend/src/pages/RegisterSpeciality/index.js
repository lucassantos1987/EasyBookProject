import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import './styles.css';

export default function RegisterCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        api.get('category').then(response => {
            setCategories(response.data);
        });
    }, []);

    const categoryRef = useRef();
    
    async function hangleRegiter(e) {
        e.preventDefault();

        const id_category = categoryRef.current.value;

        console.log(id_category);

        const data = {
            id_category,
            name
        };

        try {
            await api.post('speciality', data);
            alert('Especialidade gravada com sucesso.');
        } catch (err) {
            alert('Erro no cadastro. Tente novamente.');
        }
    }

    return(
        <div className="speciality-container">
            <div className="header">
                <h1>Painel Administrativo EasyBook</h1>
            </div>
            <div className="content">
                <section>
                    <h1>Cadastro de Especialidades</h1>
                    <form onSubmit={hangleRegiter}>
                        <select ref={categoryRef}>
                            <option value="">Selecione a Categoria</option>
                            {
                                categories.map(category => (
                                    <option value={category.id}>{category.name}</option>                                    
                                ))
                            }
                        </select>
                        <input 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Digite o nome da Especialidade"/>
                        <button className="button" type="submit">Cadastrar</button>
                    </form>                    
                </section>
           </div>
        </div>
    );
}