import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import MenuCustomer from '../pages/MenuCustomer';
import DataCustomer from '../pages/DataCustomer';
import ListCategory from '../pages/RequestProvider/Category';
import ListProvider from '../pages/RequestProvider/Provider';
import InfoProvider from '../pages/RequestProvider/InfoProvider';


export default function AppRoutes() {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="MenuCustomer" component={MenuCustomer} />
            <AppStack.Screen name="DataCustomer" component={DataCustomer} />
            <AppStack.Screen name="ListCategory" component={ListCategory} />
            <AppStack.Screen name="ListProvider" component={ListProvider} />
            <AppStack.Screen name="InfoProvider" component={InfoProvider} />
        </AppStack.Navigator>
    );
}