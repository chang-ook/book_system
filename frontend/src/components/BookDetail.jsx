import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function BookDetail() {
  const [book, setBook] = useState(null);
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleRecommend = () => {
    if (!apiKey) return alert("API 키를 입력해주세요.");
    if (!book) return alert("책 정보를 불러오는 중입니다.");

const prompt = `너는 세계적인 책 평론가이자 북 큐레이터야.
사용자가 방금 본 책 정보를 아래에 제공할게.
- 제목: ${book.title}
- 내용 요약: ${book.contents}

이 책과 유사한 분위기나 주제를 가진 가상의 책 1권을 추천해줘.
📘 제목 + ✍️ 한줄평 형식으로 출력해줘.

한줄평은 독자가 **바로 읽고 싶어지도록 강렬하고 감성적으로** 써줘.
예: "읽는 내내 가슴이 먹먹해지는 성장 이야기", "기억을 되짚는 섬세한 심리 묘사"

결과 예시:
- 『가상의 책 제목』: "매일 밤, 잊고 있던 나를 꺼내보게 되는 소설"
`;

    setIsLoading(true);
    axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      }
    ).then(res => {
      const result = res.data.choices[0].message.content;
      setRecommendations(result);
      setIsLoading(false);
      handleCloseDialog();
    }).catch(err => {
      console.error(err);
      alert("추천 실패");
      setIsLoading(false);
    });
  };

  if (!book) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start' }}>
        <img src={book.cover_image} alt="cover" style={{ width: "100%", maxWidth: "360px", borderRadius: '8px' }} />

        <div style={{ flex: 1 }}>
          <h2>{book.title}</h2>
          <p>{book.contents}</p>
          <p style={{ fontSize: '12px', color: '#888' }}>
            최초 등록일: {book.upload_date?.substring(0, 10)}<br />
            마지막 수정일: {book.update_date?.substring(0, 10)}
          </p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/books/edit/${id}`)}>수정</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>삭제</Button>
            <Button variant="outlined" onClick={() => navigate(`/`)}>책 목록보기</Button>
            <Button variant="contained" color="success" onClick={handleOpenDialog}>유사 도서 추천</Button>
          </div>

          {/* 추천 결과 출력 */}
          {isLoading ? (
            <div style={{ marginTop: '20px' }}><CircularProgress /></div>
          ) : recommendations && (
            <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
              <h4>📚유사 도서 추천</h4>
              {recommendations}
            </div>
          )}
        </div>
      </div>

      {/* API Key 입력 다이얼로그 */}
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
          <Button onClick={handleRecommend}>추천 요청</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookDetail;
