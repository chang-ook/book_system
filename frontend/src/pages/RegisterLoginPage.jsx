// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/users/register', {
        username,
        password,
      });
      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      alert('회원가입 실패: ' + (err.response?.data?.message || '서버 오류'));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <h2>회원가입</h2>
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
      <button onClick={handleRegister} style={{ width: '100%' }}>회원가입</button>
    </div>
  );
}

export default RegisterPage;
