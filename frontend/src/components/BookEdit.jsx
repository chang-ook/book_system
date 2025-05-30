import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BookEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/books/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/v1/books/${id}`, {
      title, content
    }).then(() => {
      alert('수정 완료');
      navigate(`/books/${id}`);
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용" />
      <button type="submit">수정</button>
      <button onClick={() => navigate(-1)}>취소</button>
    </form>
  );
}
export default BookEdit;