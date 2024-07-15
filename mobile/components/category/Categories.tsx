import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

const addCategory = async (name) => {
    try {
        const response = await axios.post(`${BASE_URL}/categories`, { name });
        Alert.alert('Success', response.data.message);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', error.response?.data?.error || 'An error occurred');
        throw error;
    }
};

const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/categories/${categoryId}/delete`);
        Alert.alert('Success', response.data.message);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', 'Failed to delete category');
        throw error;
    }
};

const AddCategory = ({ onAddCategory }) => {
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Category name cannot be empty');
            return;
        }
        try {
            await addCategory(name);
            onAddCategory();
            setName('');
        } catch (error) {
            // Error is already handled in addCategory function
        }
    };

    return (
        <View style={styles.addCategoryContainer}>
            <Text style={styles.headerText}>Add Category</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Category Name"
            />
            <Button title="Add" onPress={handleSubmit} />
        </View>
    );
};

const DeleteCategory = ({ categoryId, onDeleteCategory }) => {
    const handleDelete = async () => {
        try {
            await deleteCategory(categoryId);
            onDeleteCategory();
        } catch (error) {
            // Error is already handled in deleteCategory function
        }
    };

    return (
        <Button title="Delete" onPress={handleDelete} color="red" />
    );
};

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                Alert.alert('Error', 'Failed to fetch categories');
            }
        };

        getCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            Alert.alert('Error', 'Failed to fetch categories');
        }
    };

    const renderCategory = ({ item }) => (
        <View style={styles.categoryContainer}>
            <Text>{item.name}</Text>
            <DeleteCategory categoryId={item.id} onDeleteCategory={fetchCategories} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Manage Categories</Text>
            <AddCategory onAddCategory={fetchCategories} />
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addCategoryContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export { ManageCategory };