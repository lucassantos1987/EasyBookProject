import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStatck = createStackNavigator();

import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import RegisterStepOne from './pages/RegisterSteps/RegisterStepOne';
import RegisterStepTwo from './pages/RegisterSteps/RegisterStepTwo';
import RegisterStepThree from './pages/RegisterSteps/RegisterStepThree';
import RegisterStepFour from './pages/RegisterSteps/RegisterStepFour';

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStatck.Navigator screenOptions={{ headerShown: false}}>
                <AppStatck.Screen name="Login" component={Login}/>
                <AppStatck.Screen name="Register" component={Register}/>
                <AppStatck.Screen name="Menu" component={Menu}/>
                <AppStatck.Screen name="RegisterStepOne" component={RegisterStepOne}/>
                <AppStatck.Screen name="RegisterStepTwo" component={RegisterStepTwo}/>
                <AppStatck.Screen name="RegisterStepThree" component={RegisterStepThree}/>
                <AppStatck.Screen name="RegisterStepFour" component={RegisterStepFour}/>
            </AppStatck.Navigator>
        </NavigationContainer>
    );
}