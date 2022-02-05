import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import RegisterCustomer from '../pages/RegisterCustomer';
import ListCategory from '../pages/RequestProvider/Category';
import ListProvider from '../pages/RequestProvider/Provider';
import InfoProvider from '../pages/RequestProvider/InfoProvider';


export default function AuthRoutes() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Main" component={Main} />
            <AuthStack.Screen name="Login" component={SignIn} />
            <AuthStack.Screen name="RegisterCustomer" component={RegisterCustomer} />
            <AuthStack.Screen name="ListCategory" component={ListCategory} />
            <AuthStack.Screen name="ListProvider" component={ListProvider} />
            <AuthStack.Screen name="InfoProvider" component={InfoProvider} />
        </AuthStack.Navigator>
    );
}