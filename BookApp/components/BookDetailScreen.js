import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function BookDetailScreen({ route }) {
  const { book } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Book Cover Page */}
      {book.CoverPage && (
        <Image
          source={{ uri: book.CoverPage }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      )}

      {/* Book Details Container */}
      <View style={styles.detailsContainer}>
        {/* Book Name */}
        <Text style={styles.title}>{book.Name}</Text>

        {/* Author Name */}
        <Text style={styles.author}>by {book.Author}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>Rating: </Text>
          <Text style={styles.ratingValue}>{book.Ratings}/5</Text>
        </View>

        {/* Brief Summary */}
        <Text style={styles.summaryTitle}>Summary</Text>
        <Text style={styles.summary}>{book.Summary}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f4f7',
    padding: 16,
  },
  coverImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 18,
    color: '#555',
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB300', 
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'justify',
  },
});
