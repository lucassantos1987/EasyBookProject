import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Register from './pages/Register';
import RegisterCustomer from './pages/RegisterCustomer';
import MenuCustomer from './pages/MenuCustomer';
import DataCustomer from './pages/DataCustomer';
import RequestCategory from './pages/RequestProvider/Category';
import RequestSpeciality from './pages/RequestProvider/Speciality';
import RequestProvider from './pages/RequestProvider/Provider';
import InfoProvider from './pages/RequestProvider/InfoProvider';
import Menu from './pages/Menu';
import DataProvider from './pages/DataProvider/DataProvider';
import CategorySpecialityProvider from './pages/DataProvider/CategorySpecialityProvider';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="RegisterCustomer" component={RegisterCustomer} />
                <AppStack.Screen name="MenuCustomer" component={MenuCustomer} />
                <AppStack.Screen name="DataCustomer" component={DataCustomer} />
                <AppStack.Screen name="RequestCategory" component={RequestCategory} />
                <AppStack.Screen name="RequestSpeciality" component={RequestSpeciality} />
                <AppStack.Screen name="RequestProvider" component={RequestProvider} />
                <AppStack.Screen name="InfoProvider" component={InfoProvider} />
                <AppStack.Screen name="Menu" component={Menu} />
                <AppStack.Screen name="DataProvider" component={DataProvider} />
                <AppStack.Screen name="CategorySpecialityProvider" component={CategorySpecialityProvider} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}