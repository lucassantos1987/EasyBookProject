import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import MenuCustomer from '../pages/MenuCustomer';
import DataCustomer from '../pages/DataCustomer';


export default function AppRoutes() {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="MenuCustomer" component={MenuCustomer} />
            <AppStack.Screen name="DataCustomer" component={DataCustomer} />
        </AppStack.Navigator>
    );
}