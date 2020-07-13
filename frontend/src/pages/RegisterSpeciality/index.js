import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from 'react-loader-spinner';

import api from '../../services/api';

import './styles.css';
import 'react-tabs/style/react-tabs.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function RegisterCategory() {
    const [specialities_categories, setSpecialitiesCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [filterInputName, setFilterInputName] = useState('');
    const [filterCategories, setFilterCategories] = useState([]);

    useEffect(() => {
        api.get('category').then(response => {
            setCategories(response.data);
            setFilterCategories(response.data);
        });
    }, []);

    const categoryRef = useRef();
    const filterCategoryRef = useRef();

    function request(e) {
        e.preventDefault();

        setLoading(true);

        const filterCategory = filterCategoryRef.current.value;
        const filterName = filterInputName; 

        if (filterCategory && filterName) {
            api.get('speciality_category', { params: { id_category: filterCategory, name: filterName } })
            .then(response => {
                setLoading(false);
                setSpecialitiesCategories(response.data);
            });
        } else if (filterCategory && !filterName) {
            api.get('speciality_category', { params: { id_category: filterCategory } })
            .then(response => {
                setLoading(false);
                setSpecialitiesCategories(response.data);
            });
        } else if (!filterCategory && filterName) {
            api.get('speciality_category', { params: { name: filterName } })
            .then(response => {
                setLoading(false);
                setSpecialitiesCategories(response.data);
            });
        } else {
            api.get('speciality_category')
            .then(response => {
                setLoading(false);
                setSpecialitiesCategories(response.data);
            });
        }
    }

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
                            <form>
                            <select 
                                    ref={filterCategoryRef}>
                                    <option value="">Selecione a Categoria</option>
                                    {
                                        filterCategories.map(category => (
                                            <option value={category.id}>{category.name}</option>                                    
                                        ))
                                    }
                                </select>
                                <input
                                    value={filterInputName}
                                    onChange={e => setFilterInputName(e.target.value)}
                                    placeholder="Digite o nome da Especialidade"/>
                                <button className="button" onClick={request}>Pesquisar</button>
                            </form>
                            <table className="grid">
                                <tr>
                                    <th className="colName">Categoria</th>
                                    <th className="colName">Especialidade</th>
                                </tr>
                                {loading ? <Loader type="ThreeDots" color="#9b59b6" width={30} height={30} /> : 
                                    specialities_categories.map(speciality_category => (
                                        <tr>
                                            <td>{speciality_category.category}</td>
                                            <td>{speciality_category.speciality}</td>
                                        </tr>
                                        )
                                    )
                                }
                            </table>
                        </TabPanel>

                        <TabPanel>
                            <form onSubmit={hangleRegiter}>
                                <select 
                                    required
                                    ref={categoryRef}>
                                    <option value="">Selecione a Categoria</option>
                                    {
                                        categories.map(category => (
                                            <option value={category.id}>{category.name}</option>                                    
                                        ))
                                    }
                                </select>
                                <input
                                    required 
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