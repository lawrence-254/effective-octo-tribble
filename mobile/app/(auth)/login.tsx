import {Text, View, StyleSheet} from 'react-native'

const Login = () => {
    return (
        <View style={styles.container}>
        <Text>Login</Text>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'teal',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login
