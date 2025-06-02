// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/v1/users/login', {
      username,
      password
    }).then(res => {
      const token = res.data.token;
      localStorage.setItem('token', token); // 토큰 저장
      alert('로그인 성공!');
    }).catch(err => {
      alert('로그인 실패!');
      console.error(err);
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginPage;
