// EditPage.jsx
import React from 'react';
import BookEdit from '../components/BookEdit';

function EditPage() {
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
          fontSize: '28px'}}>✏️ 도서 수정</h2>
          <hr></hr>
        <BookEdit />
      </div>
    </div>
  );
}
export default EditPage;



    // <div>
    //   <BookEdit />
    // </div>