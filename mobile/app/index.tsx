import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const ICON_SIZE = 350;

export const JournalIcon = ({ size = ICON_SIZE, color = '#014E4E' }) => (
  <Icon name="book-outline" size={size} color={color} />
);

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={{ height: '100%' }}>
    <View style={styles.iconContainer}>
    <JournalIcon />
    <Text style={styles.title}>Welcome to Journal!</Text>
    <Text>SAVE YOUR THOUGHTS.</Text>
    </View>
    <View style={styles.linksContainer}>
    <Link href="/login" style={styles.link}>
    <Text style={styles.linkText}>LOGIN</Text>
    </Link>
    <Link href="/signup" style={styles.link}>
    <Text style={styles.linkText}>SIGN UP</Text>
    </Link>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'teal',
    flex: 1,
  },
  iconContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linksContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  link: {
    padding: 15,
    backgroundColor: '#008B8B',
    borderRadius: 5,
    alignItems: 'center',
    width: '28%',
  },
  linkText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#014E4E',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#014E4E',
    textAlign: 'center',
  },
});


