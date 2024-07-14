import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import React, { useState, useContext } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';

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
    const authContext = useContext(AuthContext);
    const { register } = authContext;
    const router = useRouter();


    const handleRegister = async () => {
        const { email, username, password, confirm_password } = form;

        if (!email || !username || !password || !confirm_password) {
            Alert.alert('All fields are required');
            return;
        }

        if (password !== confirm_password) {
            Alert.alert('Passwords do not match');
            return;
        }

         if (!/\S+@\S+\.\S+/.test(email)) {
          Alert.alert('Invalid email address');
          return;
        }

        setIsLoading(true);


        try {
              await register(username, email, password, confirm_password);
              setIsLoading(false);
              Alert.alert('Registration successful', 'You can now log in', [
                  { text: 'OK', onPress: () => router.replace('/login') }
                  ]);
            } catch (error) {
              setIsLoading(false);
              Alert.alert('Registration failed', error.response ? error.response.data.message : error.message);
            }
          };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>REGISTER</Text>
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
                        handlePress={handleRegister}
                        containerStyles={{ opacity: isLoading ? 0.6 : 1 }}
                        disabled={isLoading}
                    />
                    <Text>Have an account? <Link href="/login"><Text style={styles.linkText}>LOGIN</Text></Link></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'teal',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white',
    },
    linkText: {
        color: 'orange',
    },
});

export default SignUp;
