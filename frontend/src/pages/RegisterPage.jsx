// RegisterPage.jsx
import React from 'react';
import BookForm from '../components/BookForm';

function RegisterPage() {
  return (
    <div style = {{maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
      <h2 style={{textAlign: 'left', marginBottom: '10px'}}>책 등록</h2>
      <hr style={{marginBottom: '30px'}} />
      <BookForm />
    </div>
  );
}
export default RegisterPage;
