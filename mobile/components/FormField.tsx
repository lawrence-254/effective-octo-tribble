import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

interface FormFieldProps {
    label: string;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    isPassword?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    isPassword = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        placeholderTextColor="#d3d3d3"
        />
        {isPassword && (
            <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}
            >
            <Text style={styles.toggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
        )}
        </View>
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
    inputContainer: {
        position: 'relative',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        paddingRight: 70,
        fontSize: 16,
    },
    toggleButton: {
        position: 'absolute',
        right: 10,
        top: 12,
    },
    toggleText: {
        color: "#1C6B3A",
    },
});

export default FormField;


