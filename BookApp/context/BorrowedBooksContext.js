import React, { createContext, useState } from 'react';

// Create the context
export const BorrowedBooksContext = createContext();

export const BorrowedBooksProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (book) => {
    if (borrowedBooks.length < 3) {
      setBorrowedBooks([...borrowedBooks, book]);
    } else {
      alert('You cannot borrow more than 3 books at a time.');
    }
  };

  const returnBook = (bookId) => {
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
  };

  return (
    <BorrowedBooksContext.Provider value={{ borrowedBooks, borrowBook, returnBook }}>
      {children}
    </BorrowedBooksContext.Provider>
  );
};
