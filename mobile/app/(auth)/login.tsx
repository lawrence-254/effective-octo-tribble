import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import React, { useState, useEffect, useContext } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import {AuthProvider, AuthContext} from '../../context/AuthContext'


interface FormState {
    username: string;
    password: string;
}



const Login: React.FC = () => {
    const [username, setUsername] = useState<FormState>('');
    const [password, setPassword] = useState<FormState>('');
    const val = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit =()=>{
        }
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>LOGIN{val}</Text>
        <FormField
        label='User Name'
    value={username}
    placeholder='Enter Username'
    onChangeText={(text) => setUsername({ username, username: text })}
    />
    <FormField
    label='Password'
    value={password}
    placeholder='Enter Password'
    secureTextEntry={true}
    onChangeText={(text) => setPassword({ password, password: text })}
    isPassword={true}
    />
    <CustomButton
    title={isLoading ? 'LOADING...' : 'LOGIN'}
    handlePress={handleSubmit}
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


// const fetchCsrfToken = async () => {
//     const response = await fetch('http://localhost:5000/api/v1/csrf-token');
//     const data = await response.json();
//     console.log(data);
//     return data.csrf_token;
// };

//     const [csrfToken, setCsrfToken] = useState<string | null>(null);
//
//     useEffect(() => {
//         const getCsrfToken = async () => {
//             const token = await fetchCsrfToken();
//             setCsrfToken(token);
//         };
//
//         getCsrfToken();
//     }, []);
//
//     const handleSubmit = async () => {
//         setIsLoading(true);
//
//         if (!form.username || !form.password) {
//             Alert.alert('Error', 'Please fill in both fields.');
//             setIsLoading(false);
//             return;
//         }
//
//         if (!csrfToken) {
//             Alert.alert('Error', 'CSRF token not available. Please try again.');
//             setIsLoading(false);
//             return;
//         }
//
//         console.log(form);
//         try {
//             await submitChange(form, csrfToken);
//         } catch (error) {
//             console.error('Error during submission:', error);
//             Alert.alert('Error', 'Failed to submit changes.');
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const submitChange = async (formData: FormState, csrfToken: string) => {
//         try {
//             const response = await fetch('http://localhost:5000/api/v1/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-Token': csrfToken,
//                 },
//                 body: JSON.stringify(formData),
//             });
//
//             const text = await response.text();
//             console.log('Raw response:', text);
//             if (!response.ok) {
//                 const result = JSON.parse(text);
//                 Alert.alert('Error', result.error || 'Something went wrong.');
//                 return;
//             }
//
//             const result = JSON.parse(text);
//             console.log(result);
//             Alert.alert('Success', 'Login successful!');
//         } catch (error) {
//             console.error('Submit Error:', error);
//             Alert.alert('Error', 'Failed to submit changes.');
//         }
//     };
