import 'react-native-gesture-handler';

import React from 'react';
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

enableScreens(false);

export default function App() {
	return (
		<NavigationContainer>
    		<Routes />
		</NavigationContainer>
  	);
}