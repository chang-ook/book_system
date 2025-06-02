// MainPage.jsx
import React from 'react';
import BookList from '../components/BookList';
import { Button } from '@mui/material';

function MainPage() {
  return (
<div style={{ backgroundColor: '#e6f7f4', minHeight: '100vh', padding: '50px 20px' }}>
  <div style={{
    backgroundColor: 'white',
    borderRadius: '16px',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  }}>
    <h2 style={{
      textAlign: 'center',
      fontFamily: 'Noto Sans KR',
      marginBottom: '20px',
      fontSize: '28px'
    }}>작가의 산책</h2>

    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
      <Button onClick={() => window.location.href = "/register"} variant="outlined">
        산책 가기
      </Button>
      <Button onClick={() => window.location.href = "/login"} variant="outlined">
        로그인
      </Button>
    </div>
    

    <hr />

    <BookList />
  </div>
</div>

  );
}
export default MainPage;
