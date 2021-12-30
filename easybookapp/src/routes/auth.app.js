import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterCustomer from './pages/RegisterCustomer';

export default function Routes() {
    return (
        <NavigationContainer>
            <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                <AuthStack.Screen name="Main" component={Main} />
                <AuthStack.Screen name="Login" component={Login} />
                <AuthStack.Screen name="Register" component={Register} />
                <AuthStack.Screen name="RegisterCustomer" component={RegisterCustomer} />
                <AuthStack.Screen name="RequestCategory" component={RequestCategory} />                
                <AuthStack.Screen name="RequestProvider" component={RequestProvider} />
                <AuthStack.Screen name="InfoProvider" component={InfoProvider} />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}