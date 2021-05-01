import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import RegisterCustomer from './pages/RegisterCustomer';
import MenuCustomer from './pages/MenuCustomer';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="RegisterCustomer" component={RegisterCustomer} />
                <AppStack.Screen name="MenuCustomer" component={MenuCustomer} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}