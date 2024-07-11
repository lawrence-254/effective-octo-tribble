import {Text, View, StyleSheet} from 'react-native'

const signup = () => {
    return (
        <View style={styles.container}>
        <Text>Signup</Text>
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
export default signup
