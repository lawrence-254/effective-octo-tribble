import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {AuthProvider} from '../../context/AuthContext'


const AuthLayout: React.FC = () => {
    return (
        <AuthProvider>
        <Stack>
        <Stack.Screen
        name="login"
        options={{
            headerShown: false,
        }}
        />
        <Stack.Screen
        name="signup"
        options={{
            headerShown: false,
        }}
        />
        </Stack>
        <StatusBar backgroundColor="#4C6B4C" style="dark" />
        </AuthProvider>
    );
};

export default AuthLayout;

