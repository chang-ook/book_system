import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/hello')
      .then(res => setBackendMessage(res.data))
      .catch(err => setBackendMessage('백엔드 API 호출 실패'));
  }, []);

  return (
    <Box textAlign="center" mt={10} px={2}>
      <Typography variant="h3" gutterBottom>
        도서 관리 시스템
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        나의 도서를 등록하고, 목록을 확인하고, AI로 표지도 만들어보세요.
      </Typography>

      {/* 백엔드 메시지 보여주기 */}
      {backendMessage && (
        <Typography variant="h6" color="secondary" gutterBottom>
          {backendMessage}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/books')}
        sx={{ mt: 4 }}
      >
        도서 목록 보기
      </Button>
    </Box>
  );
};

export default Home;
