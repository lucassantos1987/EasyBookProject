import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './styles.css';

export default function Menu() {
    return(
        <div className="menu-container">
            <div className="header">
                <h1>Painel Administrativo EasyBookApp</h1>
            </div>
            <div className="content">
                <section>
                    <h1>Menu</h1>
                    <Link className="button" to="/category">Cadastrar Categorias</Link>
                </section>
            </div>
        </div>
    );
}