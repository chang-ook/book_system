// import React, { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   Divider,
//   Stack,
// } from '@mui/material';

// function Login() {
//   const [id, setId] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // 로그인 처리 로직
//     console.log('ID:', id, 'PW:', password);
//   };

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       {/* 왼쪽 배경 이미지 */}
//     <Box
//     sx={{
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center', // 가운데 정렬 추가
//     px: { xs: 4, md: 10 },
//   }}>       
//       <Box
//         sx={{
//           flex: 1,
//           backgroundImage: `url('https://i.pinimg.com/1200x/19/dc/d8/19dcd8bedf0af12873f19ccdf36530c0.jpg')`, // 이미지 경로
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       />

//       {/* 오른쪽 로그인 폼 */}
//       <Box
//         sx={{
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           px: { xs: 4, md: 10 },
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           독서와 무제한 친해지리
//         </Typography>
//         <Typography variant="body2" color="text.secondary" mb={4}>
//           20만 권 속에서 인생책을 찾아보세요
//         </Typography>

//         <TextField
//           label="아이디"
//           fullWidth
//           margin="normal"
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//         />
//         <TextField
//           label="비밀번호"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button
//           fullWidth
//           sx={{ mt: 3, bgcolor: '#e6f7f4', color: 'black', fontWeight: 'bold' }}
//           onClick={handleLogin}
//         >
//           로그인
//         </Button>

//         <Divider sx={{ my: 3 }} />

//       </Box>
//     </Box>
//     </Box>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/login', {
        username: id,
        password: password,
      });

      if (response.status === 200) {
        alert('로그인 성공');
        console.log('로그인 성공:', response.data);
        // localStorage.setItem('token', response.data.token);
        navigate('/main');
      }
    } catch (err) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      console.error('로그인 실패:', err);
    }
  };

  const handleSignup = () => {
    navigate('/signup'); // '/signup' 페이지로 이동 (라우팅 필요)
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* 왼쪽 배경 이미지 */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url('https://i.pinimg.com/1200x/19/dc/d8/19dcd8bedf0af12873f19ccdf36530c0.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 오른쪽 로그인 폼 */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 4, md: 10 },
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          독서와 무제한 친해지리
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          인생책을 찾아보세요
        </Typography>

        <TextField
          label="아이디"
          fullWidth
          margin="normal"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          sx={{ mt: 3, bgcolor: '#e6f7f4', color: 'black', fontWeight: 'bold' }}
          onClick={handleLogin}
        >
          로그인
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1.5, bgcolor: '#e6f7f4', color: 'black', fontWeight: 'bold' }}
          onClick={handleSignup}
        >
          회원가입
        </Button>

        <Divider sx={{ my: 3 }} />
      </Box>
    </Box>
  );
}

export default Login;
