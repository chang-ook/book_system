// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', {
        username,
        password
      });
      const token = res.data.token;
      localStorage.setItem('token', token); // 토큰 저장
      alert('로그인 성공');
      navigate('/'); // 메인으로 이동
    } catch (err) {
      alert('로그인 실패: ' + err.response?.data?.message || '서버 오류');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', margin: '10px 0', width: '100%' }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px 0', width: '100%' }}
      />
      <button onClick={handleLogin} style={{ width: '100%' }}>로그인</button>
    </div>
  );
}

export default LoginPage;
