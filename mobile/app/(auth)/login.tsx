import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import React, { useState, useContext } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { AuthContext } from '../../context/AuthContext'


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('All fields are required');
            return;
        }

        setIsLoading(true);

        try {
            await login(username, password);
            setIsLoading(false);
            router.replace('/home');
            Alert.alert('Login successful');
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Login failed', error.response ? error.response.data.message : error.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 24, marginBottom: 20 }}>LOGIN</Text>
                    <FormField
                        label='User Name'
                        value={username}
                        placeholder='Enter Username'
                        onChangeText={(text) => setUsername(text)}
                    />
                    <FormField
                        label='Password'
                        value={password}
                        placeholder='Enter Password'
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        isPassword={true}
                    />
                    <CustomButton
                        title={isLoading ? 'LOADING...' : 'LOGIN'}
                        handlePress={handleLogin}
                        containerStyles={{ opacity: isLoading ? 0.6 : 1 }}
                        disabled={isLoading}
                    />
                    <Text>Don't have an account? <Link href="/signup">
                        <Text style={styles.linkText}>REGISTER</Text>
                    </Link></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'teal',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        color: 'orange'
    },
});

export default Login;
