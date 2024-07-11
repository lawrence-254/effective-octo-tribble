import { Text, View,StyleSheet } from "react-native";
import {Link} from 'expo-router'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Welcome to journal</Text>
      <Link href="/login">LOGIN</Link>
      <Link href="/signup">SIGN UP</Link>
      <Link href="/home">home</Link>

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

