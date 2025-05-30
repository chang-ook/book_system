import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
    <div>
      <img src={book.cover_image} alt="cover" width="100" />
      <h2>{book.title}</h2>
      <p>{book.content}</p>
      <button onClick={() => navigate(`/books/edit/${id}`)}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}
export default BookDetail;