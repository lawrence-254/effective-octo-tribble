import { ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';


interface FormState {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        username: '',
        password: ''
    });

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>LOGIN</Text>
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
<CustomButton
title='LOGIN'
/>
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
});

export default Login;

