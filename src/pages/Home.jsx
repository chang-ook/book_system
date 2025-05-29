// src/pages/Home.jsx
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" gutterBottom>
        도서 관리 시스템
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        나의 도서를 등록하고, 목록을 확인하고, AI로 표지도 만들어보세요.
      </Typography>
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
