import { ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';


interface FormState {
    email: string;
    username: string;
    password: string;
    confirm_password: string;
}

const SignUp: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        email:'',
        username: '',
        password: '',
        confirm_password:''
    });

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.container}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>REGISTER</Text>
        <FormField
        label='Email'
    value={form.email}
    placeholder='Enter Email'
    secureTextEntry={true}
    onChangeText={(text) => setForm({ ...form, email: text })}
    keyboardType="email"
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
    />  <FormField
    label='Confirm Password'
    value={form.confirm_password}
    placeholder='Confirm Password'
    secureTextEntry={true}
    onChangeText={(text) => setForm({ ...form, confirm_password: text })}
    isPassword={true}
    />
    <CustomButton
    title='REGISTER'
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

export default SignUp;
