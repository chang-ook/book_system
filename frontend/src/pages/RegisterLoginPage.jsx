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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#fff',
      padding: '0 20px',
    }}>
      <h2 style={{ fontSize: '22px', marginBottom: '30px' }}>계정 등록</h2>

      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '14px',
          marginBottom: '14px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
      />

      <input
        type="password"
        placeholder="8~32자리의 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '14px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
      />

      <button
        onClick={handleRegister}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '14px',
          backgroundColor: '#1ec800',
          color: '#e6f7f4',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        계정 등록
      </button>
    </div>
  );
}

export default RegisterPage;
