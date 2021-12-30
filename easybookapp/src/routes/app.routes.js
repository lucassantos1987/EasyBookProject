import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import MenuCustomer from './pages/MenuCustomer';
import DataCustomer from './pages/DataCustomer';
import RequestCategory from './pages/RequestProvider/Category';
import RequestProvider from './pages/RequestProvider/Provider';
import InfoProvider from './pages/RequestProvider/InfoProvider';
import RatingProvider from "./pages/RequestProvider/RatingProvider";
import Menu from './pages/Menu';
import DataProvider from './pages/DataProvider/DataProvider';


export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="MenuCustomer" component={MenuCustomer} />
                <AppStack.Screen name="DataCustomer" component={DataCustomer} />
                <AppStack.Screen name="RequestCategory" component={RequestCategory} />                
                <AppStack.Screen name="RequestProvider" component={RequestProvider} />
                <AppStack.Screen name="InfoProvider" component={InfoProvider} />
                <AppStack.Screen name="RatingProvider" component={RatingProvider} />
                <AppStack.Screen name="Menu" component={Menu} />
                <AppStack.Screen name="DataProvider" component={DataProvider} />                
            </AppStack.Navigator>
        </NavigationContainer>
    );
}