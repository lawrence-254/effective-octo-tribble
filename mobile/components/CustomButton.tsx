import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface CustomButtonProps {
    title: string;
    handlePress: () => void;
    containerStyles?: object;
    textStyles?: object;
    isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={[styles.button, containerStyles]}
        >
        {isLoading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            <Text style={[styles.text, textStyles]}>{title}</Text>
        )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#008B8B',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CustomButton;
