import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#fff' }}>
      {/* 상단 배너 */}
      <Box sx={{ bgcolor: '#e6f7f4', textAlign: 'center', py: 1 }}>
        <Typography variant="body2">
          누구나 작가가 될 수 있는 이곳에서 당신의 이야기를 천천히, 그리고 진심으로 꺼내보세요.
        </Typography>
      </Box>

      {/* 메인 이미지 + 메시지 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '90vh', md: '80vh' },
          backgroundImage: `url('https://i.pinimg.com/1200x/19/dc/d8/19dcd8bedf0af12873f19ccdf36530c0.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 3, md: 10 },
        }}
      >
        <Box sx={{ maxWidth: '500px', color: '#fff' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            걷는 길 위에,<br />
            이야기가 피어납니다.<br />
            걷기가 서재, 작가의 산책
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => navigate('/login')}
          >
            시작하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;

