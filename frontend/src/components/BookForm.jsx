import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, CircularProgress
} from '@mui/material';

function BookForm() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleImageGenerate = async () => {
    if (!apiKey) return alert('API 키를 입력해주세요.');
    if (!title || !contents) return alert('제목과 내용을 먼저 입력해주세요.');

  const promptText = `
    지금부터 너는 이미지 생성 모델이야.
    책 제목: "${title}"
    책 내용: "${contents}"
    이 책의 표지를 만들어줘.
    스타일: 지브리 애니메이션 같은 따뜻하고 몽환적인 느낌, 자연 풍경, 부드러운 색감, 감성적인 분위기.
    이미지를 생성해줘. 텍스트 설명이 아니라 반드시 이미지로 응답해줘.
    `;

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: promptText
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('✅ GPT 응답 전체:', response.data);
      // 응답에서 이미지 URL 추출 (DALL·E 3 응답 형태)
      const message = response.data.choices[0].message;
      const image = message.content?.find(item => item.type === "image_url")?.image_url?.url;

      if (image) {
        setImageUrl(image);
      } else {
        alert("이미지 URL을 찾을 수 없습니다.");
      }

    } catch (error) {
      console.error(error);
      alert('이미지 생성 실패');
    } finally {
      setIsLoading(false);
      handleCloseDialog();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/books', {
      title,
      contents,
      coverImage: imageUrl
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
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        alignItems: 'flex-start', marginTop: '30px', flexWrap: 'wrap', gap: '20px'
      }}>
        {/* 이미지 영역 */}
        <div style={{ textAlign: 'center', flex: '1 1 360px', maxWidth: '360px', marginBottom: '20px' }}>
          <div style={{
            width: '100%', height: '480px', border: '1px solid #aaa', borderRadius: '12px',
            marginBottom: '20px', display: 'flex', justifyContent: 'center',
            alignItems: 'center', backgroundColor: '#fafafa'
          }}>
            {isLoading ? (
              <CircularProgress />
            ) : imageUrl ? (
              <img src={imageUrl} alt="cover" style={{ width: "90%", height: "90%", borderRadius: '12px' }} />
            ) : (
              <span>표지 미리보기</span>
            )}
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
            <textarea id="contents" value={contents} onChange={e => setContents(e.target.value)} required style={{ width: '300px', height: '120px', resize: 'none', padding: '5px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Button variant="contained" color="primary" type="submit">등록</Button>
            <Button variant="contained" color="primary" type="button" onClick={handleCancel}>취소</Button>
          </div>
        </form>
      </div>

      {/* API 키 입력 모달 */}
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
