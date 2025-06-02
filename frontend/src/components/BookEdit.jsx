import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button, TextField, Grid, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { CircularProgress } from '@mui/material';

function BookEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const navigate = useNavigate();

  const [apiKey, setApiKey] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleImageGenerate = () => {
    if (!apiKey) return alert('API 키를 입력해주세요.');

    setIsLoading(true);
    axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: `${title} - ${contents}`,
        n: 1,
        size: '512x512',
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      }
    ).then(res => {
      const image = res.data.data[0].url;
      setCoverImage(image);
      setIsLoading(false); 
      handleCloseDialog();
    }).catch(err => {
      console.error(err);
      alert('이미지 생성 실패');
      setIsLoading(false);
    });
  };

  return (
    <>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="contained" onClick={handleOpenDialog}>
                이미지 재생성
              </Button>
            </Box>
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

      {/* API 키 입력 다이얼로그 */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>OpenAI API 키 입력</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              label="API Key"
              type="password"
              fullWidth
              variant="standard"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isLoading}>취소</Button>
          <Button onClick={handleImageGenerate} disabled={isLoading}>이미지 생성</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BookEdit;
