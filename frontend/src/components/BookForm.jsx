import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function BookForm() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleImageGenerate = () => {
    if (!apiKey) return alert('API 키를 입력해주세요.');

    axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: `${title} - ${contents}`,
        n: 1,
        size: '512x512',
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      }
    ).then(res => {
      const image = res.data.data[0].url;
      setImageUrl(image);
      handleCloseDialog();
    }).catch(err => {
      console.error(err);
      alert('이미지 생성 실패');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/books', {
      title, contents, coverImage: imageUrl
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
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', marginTop: '30px' }}>
        {/* 이미지 영역 */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '360px', height: '480px', border: '1px solid #aaa', borderRadius: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' }}>
            {imageUrl ? <img src={imageUrl} alt="cover" width="180" height="260" /> : <span>표지 미리보기</span>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button onClick={handleOpenDialog} variant="contained" color="primary">이미지 생성</Button>
            <Button onClick={handleOpenDialog} variant="contained" color="primary">재생성</Button>
          </div>
        </div>

        {/* 입력 영역 */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="title">1. 작품 제목을 입력해주세요</label><br />
            <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '300px', height: '30px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="contents">2. 작품 내용을 입력해주세요</label><br />
            <input id="contents" type="text" value={contents} onChange={e => setContents(e.target.value)} style={{ width: '300px', height: '80px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button variant="contained" color="primary" type="submit">등록</Button>
            <Button variant="contained" color="primary" type="button" onClick={handleCancel}>취소</Button>
          </div>
        </form>
      </div>

      {/* API Key 입력 모달 */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>OpenAI API 키 입력</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="API Key"
            type="password"
            fullWidth
            variant="standard"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleImageGenerate}>이미지 생성</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookForm;
