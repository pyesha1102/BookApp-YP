import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export default function BooksListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const booksCollection = collection(db, 'Books');
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksList);
    } catch (error) {
      console.error("Error fetching books: ", error);
    } finally {
      setLoading(false);
    }
  };

 // Borrow a book
  const borrowBook = async (book) => {
    try {
      const borrowedBooksQuery = query(
        collection(db, 'borrowedBooks'), 
        where('userId', '==', 'testUser')
      );

      const borrowedBooksSnapshot = await getDocs(borrowedBooksQuery);
      const currentBorrowedCount = borrowedBooksSnapshot.docs.length;

      if (currentBorrowedCount >= 3) {
        Alert.alert('Limit Exceeded', 'You cannot borrow more than 3 books at a time.');
        return;
      }

      // Add the book 
      await addDoc(collection(db, 'borrowedBooks'), {
        userId: 'testUser',
        bookId: book.id,
        borrowedAt: new Date(),
        Name: book.Name,
        Author: book.Author,
      });

      Alert.alert('Success', `You have borrowed "${book.Name}"!`);
    } catch (error) {
      console.error('Error borrowing book:', error);
      Alert.alert('Error', 'There was an error borrowing this book. Please try again.');
    }
  };

  
  const renderBookItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.bookInfoContainer}
        onPress={() => navigation.navigate('BookDetail', { book: item })}
      >
        <Text style={styles.title}>{item.Name}</Text>
        <Text style={styles.author}>by {item.Author}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Borrow" color="#007bff" onPress={() => borrowBook(item)} />
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Books List</Text> */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  bookInfoContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    width: 80,
    marginLeft: 8,
  },
});
