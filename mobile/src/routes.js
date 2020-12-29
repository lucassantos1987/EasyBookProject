import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStatck = createStackNavigator();

import Localization from './pages/Localization';
import Login from './pages/Login';
import Menu from './pages/Menu';
import DataProvider from './pages/DataProvider/DataProvider';
import CategoriesSpecialities from './pages/DataProvider/CategorySpecialityProvider';
import Register from './pages/Register';
import RequestCategory from './pages/RequestProvider/Category';
import RequestSpeciality from './pages/RequestProvider/Speciality';
import RequestProvider from './pages/RequestProvider/Provider';
import InfoProvider from './pages/RequestProvider/InfoProvider';

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStatck.Navigator screenOptions={{ headerShown: false}}>
                <AppStatck.Screen name="Login" component={Login}/>
                <AppStatck.Screen name="Register" component={Register}/>
                <AppStatck.Screen name="Localization" component={Localization}/>
                <AppStatck.Screen name="Menu" component={Menu}/>
                <AppStatck.Screen name="DataProvider" component={DataProvider}/>
                <AppStatck.Screen name="CategoriesSpecialities" component={CategoriesSpecialities}/>
                <AppStatck.Screen name="RequestCategory" component={RequestCategory}/>
                <AppStatck.Screen name="RequestSpeciality" component={RequestSpeciality}/>
                <AppStatck.Screen name="RequestProvider" component={RequestProvider}/>
                <AppStatck.Screen name="InfoProvider" component={InfoProvider}/>
            </AppStatck.Navigator>
        </NavigationContainer>
    );
}