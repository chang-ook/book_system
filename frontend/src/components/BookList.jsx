import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book.bookId} onClick={() => navigate(`/books/${book.id}`)}>
          <img src={book.cover_image} alt="cover" width="100" />
          <p>{book.title}</p>
        </div>
      ))}
    </div>
  );
}
export default BookList;