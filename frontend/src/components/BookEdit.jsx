import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button, TextField, Grid
} from '@mui/material';

function BookEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/books/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContents(res.data.contents);
        setCoverImage(res.data.cover_image);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/v1/books/${id}`, {
      title, contents, coverImage
    }).then(() => {
      alert('수정 완료');
      navigate(`/books/${id}`);
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <Grid container spacing={4} wrap="nowrap" alignItems="center">
        {/* 이미지 영역 */}
        <Grid item xs={3}>
          <img
            src={coverImage}
            alt="도서 이미지"
            style={{
              width: '100%',
              maxWidth: '360px',
              height: 'auto',
              borderRadius: '8px',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </Grid>

        {/* 입력 폼 영역 */}
        <Grid item xs={9}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <TextField
              label="제목"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              label="내용"
              variant="outlined"
              fullWidth
              multiline
              minRows={6}
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>

      {/* 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 3 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ px: 4 }}>
          수정
        </Button>
        <Button variant="outlined" color="primary" sx={{ px: 4 }} onClick={() => navigate(-1)}>
          취소
        </Button>
      </Box>
    </form>
  );
}

export default BookEdit;
