import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { AuthProvider, AuthContext } from './contexts/auth';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Register from './pages/Register';
import RegisterCustomer from './pages/RegisterCustomer';
import MenuCustomer from './pages/MenuCustomer';
import DataCustomer from './pages/DataCustomer';
import ListCategory from './pages/RequestProvider/Category';
import ListSpeciality from './pages/RequestProvider/Speciality';
import ListProvider from './pages/RequestProvider/Provider';
import InfoProvider from './pages/RequestProvider/InfoProvider';
import Menu from './pages/Menu';
import DataProvider from './pages/DataProvider/DataProvider';
import RatingProvider from "./pages/RequestProvider/RatingProvider";
import Main from './pages/Main';

export default function Routes() {

    const Private = ({ children }) => {
        const { authentidaded } = useContext(AuthContext);
        const navigation = useNavigation();

        if (!authentidaded) {
            navigation.navigate('Login');
        }

        return children;
    }

    return (
        <NavigationContainer>
            <AuthProvider>
                    <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name="Main" component={Main} />
                    <AppStack.Screen name="Login" component={Login} />
                    <AppStack.Screen name="Menu" component={Menu} />
                    <AppStack.Screen name="ListCategory" component={ListCategory} />                    
                    <AppStack.Screen name="Register" component={Register} />
                    <AppStack.Screen name="RegisterCustomer" component={RegisterCustomer} />
                    <AppStack.Screen name="MenuCustomer" component={MenuCustomer} />
                    <AppStack.Screen name="DataCustomer" component={DataCustomer} />                
                    <AppStack.Screen name="ListSpeciality" component={ListSpeciality} />
                    <AppStack.Screen name="ListProvider" component={ListProvider} />
                    <AppStack.Screen name="InfoProvider" component={InfoProvider} />                    
                    <AppStack.Screen name="DataProvider" component={DataProvider} />
                    <AppStack.Screen name="RatingProvider" component={RatingProvider} />
                </AppStack.Navigator>
            </AuthProvider>
        </NavigationContainer>
    );
}