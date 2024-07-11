import { Text, View,StyleSheet } from "react-native";
import {Link} from 'expo-router'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text className="text-3xl">Edit app/index.tsx to edit this screen.</Text>
      <Text>Welcome to journal</Text>
      <Link href="/profile">profile</Link>
      <Link href="/login">LOGIN</Link>
      <Link href="/signup">SIGN UP</Link>
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

