import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from './api';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { username, password });
            console.log('Login response:', response.data);
            // Redirect to HomeScreen or handle session in some way
            navigation.navigate('Home');
        } catch (error) {
            console.error('Login error:', error);
            // Handle error (show message to user, etc.)
        }
    };

    return (
        <View>
        <Text>Login</Text>
        <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        />
        <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
