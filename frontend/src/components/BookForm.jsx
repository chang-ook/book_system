import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleImageGenerate = () => {
    axios.post('http://localhost:8080/api/v1/cover', { title, content })
      .then(res => setImageUrl(res.data.imageUrl))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/books', {
      title, content, coverImage: imageUrl
    }).then(() => {
      alert('등록 완료');
      navigate('/');
    }).catch(err => console.error(err));
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>책 등록</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', marginTop: '30px' }}>
        {/* 이미지 영역 */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '180px', height: '260px', border: '1px solid #aaa', borderRadius: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' }}>
            {imageUrl ? <img src={imageUrl} alt="cover" width="180" height="260" /> : <span>표지 미리보기</span>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button type="button" onClick={handleImageGenerate}>이미지 생성</button>
            <button type="button" onClick={handleImageGenerate}>재 생성</button>
          </div>
        </div>

        {/* 입력 영역 */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="title">1. 작품 제목을 입력해주세요*</label><br />
            <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '300px', height: '30px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="content">2. 작품에 대한 소개를 입력해주세요</label><br />
            <input id="content" type="text" value={content} onChange={e => setContent(e.target.value)} style={{ width: '300px', height: '80px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button type="submit">등록</button>
            <button type="button" onClick={handleCancel}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;