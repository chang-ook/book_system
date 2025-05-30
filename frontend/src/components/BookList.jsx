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
    <div className="book-list" style={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '20px', 
    justifyContent: 'center', 
    padding: '20px' 
  }}>
      {books.map(book => (
        <div key={book.bookId} onClick={() => navigate(`/books/${book.id}`)}
        style={{
          width: '160px',
          cursor: 'pointer',
          border: '1px solid #ddd',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '10px',
          backgroundColor: '#fff',
          textAlign: 'center',
          transition: 'transform 0.2s ease-in-out'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <img src={book.cover_image} alt="cover" style={{ width: '100%', borderRadius: '8px' }} />
          <p style={{marginTop: '10px', fontWeight: 'bold', fontSize: '14px'}}>{book.title}</p>
          <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            {book.upload_date?.substring(0, 10)}
          </p>
        </div>
      ))}
    </div>
  );
}
export default BookList;