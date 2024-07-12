import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const ICON_SIZE = 30;

export const HomeIcon = ({ size = ICON_SIZE, color = '#000' }) => (
    <Icon name="home-outline" size={size} color={color} />
);



export const ProfileIcon = ({ size = ICON_SIZE, color = '#000' }) => (
    <Icon name="person-outline" size={size} color={color} />
);

export const JournalIcon = ({ size = ICON_SIZE, color = '#000' }) => (
    <Icon name="book-outline" size={size} color={color} />
);

const TabIcon = ({ IconComponent, color, size }) => {
    return (
        <View>
        <IconComponent size={size} color={color} />
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: 'teal',
            tabBarInactiveTintColor:'black',
            tabBarStyle:{
                backgroundColor:'teal'
            }
        }}
        >
        <Tabs.Screen
        name="home"
        options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => (
                <TabIcon
                IconComponent={HomeIcon}
                color={color}
                size={ICON_SIZE}
                />
            ),
        }}
        />
        <Tabs.Screen
        name="journal"
        options={{
            title: 'Journal',
            headerShown: false,
            tabBarIcon: ({ color }) => (
                <TabIcon
                IconComponent={JournalIcon}
                color={color}
                size={ICON_SIZE}
                />
            ),
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color }) => (
                <TabIcon
                IconComponent={ProfileIcon}
                color={color}
                size={ICON_SIZE}
                />
            ),
        }}
        />
        </Tabs>
        </>
    );
};

export default TabsLayout;

