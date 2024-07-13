import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import React, { useState, useContext } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import {AuthProvider, AuthContext} from '../../context/AuthContext'


interface FormState {
    email: string;
    username: string;
    password: string;
    confirm_password: string;
}

const SignUp: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        email: '',
        username: '',
        password: '',
        confirm_password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const val = useContext(AuthContext)

    const handleSubmit=()=>{
        }

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>REGISTER</Text>
        <FormField
        label='Email'
    value={form.email}
    placeholder='Enter Email'
    onChangeText={(text) => setForm({ ...form, email: text })}
    keyboardType="email-address"
    />
    <FormField
    label='User Name'
    value={form.username}
    placeholder='Enter Username'
    onChangeText={(text) => setForm({ ...form, username: text })}
    />
    <FormField
    label='Password'
    value={form.password}
    placeholder='Enter Password'
    secureTextEntry={true}
    onChangeText={(text) => setForm({ ...form, password: text })}
    isPassword={true}
    />
    <FormField
    label='Confirm Password'
    value={form.confirm_password}
    placeholder='Confirm Password'
    secureTextEntry={true}
    onChangeText={(text) => setForm({ ...form, confirm_password: text })}
    isPassword={true}
    />
    <CustomButton
    title={isLoading ? 'LOADING...' : 'REGISTER'}
    handlePress={handleSubmit}
    containerStyles={{ opacity: isLoading ? 0.6 : 1 }}
    disabled={isLoading}
    />
    <Text>Have an account? <Link href="/login">
    <Text style={styles.linkText}>LOGIN</Text>
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
    }
});

export default SignUp;
