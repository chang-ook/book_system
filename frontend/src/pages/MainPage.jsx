// MainPage.jsx
import React from 'react';
import BookList from '../components/BookList';

function MainPage() {
  return (
    <div>
      <h2>작가의 산책</h2>
      <button onClick={() => window.location.href = "/register"}>등록</button>
      <BookList />
    </div>
  );
}
export default MainPage;
