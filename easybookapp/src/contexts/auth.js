import React, { useState, createContext } from 'react';
import signInService from '../services/signIn';


const AuthContext = createContext({ signed: Boolean(false), user: Object({}), signIn(email, password){} });

export const AuthProvider = ({ children }) => {

    async function signIn(email, password) {
        signInService.signIn(email, password);
    }

    return(
        <AuthContext.Provider value={{ signed: false, user:{}, signIn(email, password){} }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;