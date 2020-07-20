import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStatck = createStackNavigator();

import Localization from './pages/Localization';
import Register from './pages/Register';
import RequestCategory from './pages/RequestProvider/Category';
import RequestSpeciality from './pages/RequestProvider/Speciality';
import RequestProvider from './pages/RequestProvider/Provider';
import InfoProvider from './pages/RequestProvider/InfoProvider';

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStatck.Navigator screenOptions={{ headerShown: false}}>
                <AppStatck.Screen name="Localization" component={Localization}/>
                <AppStatck.Screen name="Register" component={Register}/>
                <AppStatck.Screen name="RequestCategory" component={RequestCategory}/>
                <AppStatck.Screen name="RequestSpeciality" component={RequestSpeciality}/>
                <AppStatck.Screen name="RequestProvider" component={RequestProvider}/>
                <AppStatck.Screen name="InfoProvider" component={InfoProvider}/>
            </AppStatck.Navigator>
        </NavigationContainer>
    );
}