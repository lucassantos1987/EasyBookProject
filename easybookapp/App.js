import React from 'react';
import { enableScreens } from 'react-native-screens'

import Routes from './src/routes';

enableScreens(false);

export default function App() {
	return (
    	<Routes />
  	);
}