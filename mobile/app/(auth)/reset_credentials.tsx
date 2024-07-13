import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

interface FormState {
    email: string;
    username: string;
    password: string;
    confirm_password: string;
}


const ResetPassword = () => {
    const [form, setForm] = useState<FormState>({
        password: '',
        confirm_password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const submitChange = async (formData: {  password: string, confirm_password: string }) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/reset_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Your changes have been submitted successfully.');
            } else {
                Alert.alert('Error', result.message || 'Something went wrong.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to submit changes.');
        }
    };
    const handleSubmit = async () => {
        setIsLoading(true);
        await submitChange(form);
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.innerContainer}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>CHANGE YOUR PASSWORD</Text>
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
    <CustomButton title="Submit" handlePress={() => {handleSubmit}}
    containerStyles={{ opacity: isLoading ? 0.6 : 1 }}
    disabled={isLoading}
    />
    </View>
    </ScrollView>
    </SafeAreaView>
    );
};

const ResetUsername = () => {
    const [form, setForm] = useState<FormState>({
        username: '',

    });
    const [isLoading, setIsLoading] = useState(false);
    const submitChange = async (formData: {  username: string; }) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/reset_username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Your changes have been submitted successfully.');
            } else {
                Alert.alert('Error', result.message || 'Something went wrong.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to submit changes.');
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await submitChange(form);
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.innerContainer}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>CHANGE USERNAME</Text>
        <FormField
        label='Username'
    value={form.username}
    placeholder='Enter Username'
    onChangeText={(text) => setForm({ ...form, username: text })}
    />
    <CustomButton title="Submit" handlePress={() => {handleSubmit}}
    containerStyles={{ opacity: isLoading ? 0.6 : 1 }}
    disabled={isLoading}
    />
    </View>
    </ScrollView>
    </SafeAreaView>
    );
};

const ResetEmail = () => {
    const [form, setForm] = useState<FormState>({
        email: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const submitChange = async (formData: { email: string }) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/reset_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Your changes have been submitted successfully.');
            } else {
                Alert.alert('Error', result.message || 'Something went wrong.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to submit changes.');
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await submitChange(form);
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.innerContainer}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>CHANGE EMAIL</Text>
        <FormField
        label='Email'
    value={form.email}
    placeholder='Enter Email'
    onChangeText={(text) => setForm({ ...form, email: text })}
    keyboardType="email-address"
    />
    <CustomButton title="Submit" handlePress={() => {handleSubmit}}
    containerStyles={{ opacity: isLoading ? 0.6 : 1 }}
    disabled={isLoading}
    />
    </View>
    </ScrollView>
    </SafeAreaView>
    );
};

const ResetCredentials: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<string>('email');

    let ComponentToRender;
    switch(selectedComponent) {
        case 'email':
            ComponentToRender = ResetEmail;
            break;
        case 'password':
            ComponentToRender = ResetPassword;
            break;
        case 'username':
            ComponentToRender = ResetUsername;
            break;
        default:
            ComponentToRender = () => (
                <View style={styles.container}>
                <Text>Invalid type</Text>
                </View>
            );
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
        <View style={styles.buttonContainer}>
        <Button title=" Email" onPress={() => setSelectedComponent('email')} />
        <Button title="Password" onPress={() => setSelectedComponent('password')} />
        <Button title="Username" onPress={() => setSelectedComponent('username')} />
        </View>
        <ComponentToRender />
        </SafeAreaView>
    );
};

export default ResetCredentials;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '88%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
});



