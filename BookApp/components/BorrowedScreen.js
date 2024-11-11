import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, query, where, doc } from 'firebase/firestore';

export default function BorrowedScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const borrowedBooksQuery = query(
        collection(db, 'borrowedBooks'),
        where('userId', '==', 'testUser') 
      );
      const borrowedBooksSnapshot = await getDocs(borrowedBooksQuery);
      const booksList = borrowedBooksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBorrowedBooks(booksList);
    } catch (error) {
      console.error("Error fetching borrowed books: ", error);
    } finally {
      setLoading(false);
    }
  };

  const returnBook = async (bookId) => {
    try {
      await deleteDoc(doc(db, 'borrowedBooks', bookId));
      Alert.alert('Returned', 'You have returned the book.');
      setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error returning book: ", error);
    }
  };

  const renderBorrowedBookItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.bookInfoContainer}>
        <Text style={styles.title}>{item.Name}</Text>
        <Text style={styles.author}>by {item.Author}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Return" color="#FF6347" onPress={() => returnBook(item.id)} />
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Borrowed Books</Text>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBorrowedBookItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No books borrowed.</Text>}
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
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});
