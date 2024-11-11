

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BooksListScreen from './BooksListScreen';
import BookDetailScreen from './BookDetailScreen';

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator
      initialRouteName="BooksList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF', 
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="BooksList"
        component={BooksListScreen}
        options={{ title: 'Books List' }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ title: 'Book Detail' }}
      />
    </Stack.Navigator>
  );
}
