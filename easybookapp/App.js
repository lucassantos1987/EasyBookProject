import React from 'react';
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';
import  AuthContext from './src/contexts/auth';

import Routes from './src/routes';

enableScreens(false);

export default function App() {
	return (
		<NavigationContainer>
			<AuthContext.Provider value={{ signed: false }}>
    			<Routes />
			</AuthContext.Provider>
		</NavigationContainer>
  	);
}