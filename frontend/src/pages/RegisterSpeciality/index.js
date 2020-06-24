import React from 'react';

import './styles.css';

export default function RegisterCategory() {
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro de Especialidades</h1>
                </section>
                <form>
                    <select>
                        <option value="">Selecione a Categoria</option>
                        <option value="1">Eletricista</option>
                        <option value="2">Pedreiro</option>
                        <option value="3">Marcenaria</option>
                        <option value="4">Carpintaria</option>
                        <option value="4">Jardinagem</option>
                    </select>
                    <input placeholder="Digite o nome da Especialidade"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}