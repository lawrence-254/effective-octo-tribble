import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const BASE_URL = 'http://localhost:5000/api/v1';

const Homepage: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/index`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
       <SafeAreaView style={styles.safeArea}>

       <FlatList
       data={[{id:1}, {id:2}, {id:3}, {id:4},{id:5}]}
       keyExtractor={(item) => item.id.toString()}
       renderItem={({ item }) => (
           <Text style={styles.title}>{item.id}</Text>
       )}
    ListHeaderComponent={()=>(
        <View style={styles.container}>
        <View>
        <View>
        <Text style={styles.title}>Hello user</Text>
        </View>
        <View>
        <Text style={styles.title}>Welcome Back To Your Journal</Text>
        </View>
        </View>
        </View>
    )}
       />

       </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'teal',
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color:'orange'
    },
    username: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Homepage;

// <Text style={styles.title}>{item.title}</Text>
// <Text style={styles.username}>Welcome, {item.user.username}</Text>
// <Text>Email: {data.user.email}</Text>
