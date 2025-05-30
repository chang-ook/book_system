import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BookEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/books/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContents(res.data.contents);
        setCoverImage(res.data.cover_image);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/v1/books/${id}`, {
      title, contents, coverImage
    }).then(() => {
      alert('수정 완료');
      navigate(`/books/${id}`);
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" />
      <textarea value={contents} onChange={e => setContents(e.target.value)} placeholder="내용" />

      <button type="submit">수정</button>
      <button onClick={() => navigate(-1)}>취소</button>
    </form>
  );
}
export default BookEdit;