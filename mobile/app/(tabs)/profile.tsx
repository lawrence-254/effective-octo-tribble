import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Profile = () => {
    return (
        <View style={styles.container}>
        <Text>Profile</Text>
        </View>
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

export default Profile;
