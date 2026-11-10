// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { DashboardScreen } from './src/screens/DashboardScreen';
import { AlertasScreen } from './src/screens/AlertasScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="dark" />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName = route.name === 'Dashboard' ? 'home' : 'warning';
                        return <Ionicons name={iconName as any} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#2E7D32',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Dashboard" component={DashboardScreen} />
                <Tab.Screen name="Alertas" component={AlertasScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}