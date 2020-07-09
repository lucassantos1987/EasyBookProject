import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import api from '../../services/api';

import './styles.css';
import 'react-tabs/style/react-tabs.css';

export default function RegisterCategory() {
    const [specialities_categories, setSpecialitiesCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState('');

    useEffect(() => {
        api.get('speciality_category').then(response => {
            setSpecialitiesCategories(response.data);
        });

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

                    <Tabs>
                        <TabList>
                            <Tab>Consulta</Tab>
                            <Tab>Cadastro</Tab>
                        </TabList>

                        <TabPanel>
                            <table className="grid">
                                <tr>
                                    <th className="colName">Categoria</th>
                                    <th className="colName">Especialidade</th>
                                </tr>
                                {specialities_categories.map(speciality_category => (
                                    <tr>
                                        <td>{speciality_category.category}</td>
                                        <td>{speciality_category.speciality}</td>
                                    </tr>
                                    ))
                                }
                            </table>
                        </TabPanel>

                        <TabPanel>
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
                        </TabPanel>
                    </Tabs>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={24} color="#9b59b6"/>
                        Voltar para Menu
                    </Link>
                </section>
           </div>
        </div>
    );
}