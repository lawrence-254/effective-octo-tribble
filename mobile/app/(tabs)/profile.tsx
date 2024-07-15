import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ResetCredentials from '../(auth)/reset_credentials'

const DisplayProfile =()=>{
    return(
        <View>
        <Text>Profile</Text>
        </View>
        )}

const ResetCred = ()=>{
    return(
        <View>
        <Text>Reset Details</Text>
        <ResetCredentials/>
        </View>
        )}
const Profile = () => {
    return (
        <View style={styles.container}>
        <Text>Profile</Text>
        <ResetCred/>
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
