import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Grid, Paper
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
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e7f4f3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '90%',
          maxWidth: 900,
          borderRadius: 4,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          도서 수정
        </Typography>

        <form onSubmit={handleUpdate}>
          <Grid container spacing={4}>
            {/* 이미지 박스 */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  width: '100%',
                  paddingTop: '140%',
                  backgroundImage: `url(${coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '2px solid #1565c0',
                  borderRadius: 2,
                }}
              />
            </Grid>

            {/* 입력 폼 */}
            <Grid item xs={12} md={7}>
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
      </Paper>
    </Box>
  );
}

export default BookEdit;
