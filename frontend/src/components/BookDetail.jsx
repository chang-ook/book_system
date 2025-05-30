import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
function BookDetail() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/v1/books/${id}`)
      .then(() => {
        alert('삭제 완료');
        navigate('/');
      });
  };

  if (!book) return <div>로딩 중...</div>;
return (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start', padding: '20px' }}>
    {/* 왼쪽 이미지 */}
    <img src={book.cover_image} alt="cover" style={{ width: "100%", maxWidth: "360px", borderRadius: '8px', flexShrink: 0 }} />

    {/* 오른쪽 텍스트 영역 */}
    <div style={{ flex: 1 }}>
      <h2 style={{ marginBottom: '10px' }}>{book.title}</h2>
      <p style={{ marginBottom: '20px' }}>{book.contents}</p>
      <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
        최초 등록일: {book.upload_date?.substring(0, 10)}
      </p>
      <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
        마지막 수정일: {book.update_date?.substring(0, 10)}
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="contained" color="primary" onClick={() => navigate(`/books/edit/${id}`)}>수정</Button>
        <Button variant="contained" color="primary" onClick={handleDelete}>삭제</Button>
        <Button variant="contained" color="primary" onClick={() => navigate(`/`)}>책 목록보기</Button>
      </div>
    </div>
  </div>
);
}
export default BookDetail;