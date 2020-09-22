import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from 'react-loader-spinner';

import api from '../../services/api';

import './styles.css';
import 'react-tabs/style/react-tabs.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function RegisterCategory() {
    const [name, setName] = useState('');
    const [filterName, setFilterName] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    async function request(e) {
        e.preventDefault();
        setLoading(true);

        const filterData = filterName;

        await api.get('category', { params: { name: filterData } })
        .then(response => {
            setLoading(false);
            setCategories(response.data);
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    async function handleRegister(e) {
        e.preventDefault();

        api.get('category').then(response => {
            setCategory(response.data);
        });

        var exists = false;

        for (var i = 0; i < category.length; i++) {
            var obj = category[i];

            if (obj.name === name) {
                category.splice(i, 1);
                exists = true;
                break;
            }
        }

        const data = {
            name
        };

        try {
            if (!exists) {
                await api.post('category', data);            
                alert('Categoria gravada com sucesso.');
            } else {
                alert('Categoria já esta cadastrada.');
            } 
        } catch (err) {
            alert('Erro no cadastro. Tente novamente.');
        }
    }

    return(
        <div className="category-container">
            <div className="header">
                <h1>Painel Administrativo EasyBookApp</h1>
            </div>
            <div className="content">
                <section>
                    <h1>Cadastro de Categorias</h1>

                    <Tabs>
                        <TabList>
                            <Tab>Consulta</Tab>
                            <Tab>Cadastro</Tab>
                        </TabList>

                        <TabPanel>
                            <form>
                                <input 
                                    value={filterName}
                                    onChange={e => setFilterName(e.target.value)}
                                    placeholder="Digite o nome da Categoria"/>

                                <button className="button" onClick={request}>Pesquisar</button>
                            </form>
                            <table className="grid">
                                <tr>
                                    <th className="colName">Nome</th>
                                </tr>
                                {loading ? <Loader type="ThreeDots" color="#9b59b6" width={30} height={30} /> : 
                                    categories.map(category => (   
                                        <tr>
                                            <td>{category.name}</td>
                                        </tr>
                                        )
                                    )
                                }
                            </table>
                        </TabPanel>                        

                        <TabPanel>
                            <form onSubmit={handleRegister}>
                                <input 
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Digite o nome da Categoria"/>

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