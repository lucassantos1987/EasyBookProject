import React from 'react';

import './styles.css';

export default function RegisterCategory() {
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro de Categorias</h1>
                </section>
                <form>
                    <input placeholder="Digite o nome da Categoria"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}