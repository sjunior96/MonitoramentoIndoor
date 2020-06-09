import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icom from 'react-native-vector-icons/FontAwesome5';

const HomeStack = createStackNavigator();

import HomePage from './Pages/Home';

export default function HomeNavigator(route) {
	return (
		<NavigationContainer>
			<HomeStack.Navigator initialRouteName="Home" headerMode="screen">
				<HomeStack.Screen name="HomePage" component={HomePage} options={{
					headerShown: false
				}}></HomeStack.Screen>
			</HomeStack.Navigator>
		</NavigationContainer>
	);
}