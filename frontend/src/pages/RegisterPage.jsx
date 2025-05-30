// RegisterPage.jsx
import React from 'react';
import BookForm from '../components/BookForm';

function RegisterPage() {
  return (
    <div style={{ backgroundColor: '#e6f7f4', minHeight: '100vh', padding: '50px 20px' }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Noto Sans KR',
          marginBottom: '20px',
          fontSize: '28px'
        }}>
          📚 책 등록
        </h2>
        <hr style={{ marginBottom: '30px' }} />
        <BookForm />
      </div>
    </div>
  );
}

export default RegisterPage;
