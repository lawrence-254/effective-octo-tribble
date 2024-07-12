import { View, Text, TextInput, StyleSheet } from 'react-native';
import React,{useState} from 'react';

interface FormFieldProps {
    label: string;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    isPassword?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, placeholder, value, onChangeText }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        />
        {isPassword && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '98%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});

export default FormField;

