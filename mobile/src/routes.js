import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStatck = createStackNavigator();

import Login from './pages/Login';
import Register from './pages/Register';

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStatck.Navigator screenOptions={{ headerShown: false}}>
                <AppStatck.Screen name="Login" component={Login}/>
                <AppStatck.Screen name="Register" component={Register}/>
            </AppStatck.Navigator>
        </NavigationContainer>
    );
}