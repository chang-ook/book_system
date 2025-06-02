import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';
import RegisterLoginPage from './pages/RegisterLoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books/:id" element={<DetailPage />} />
        <Route path="/books/edit/:id" element={<EditPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registerlogin" element={<RegisterLoginPage />} />
      </Routes>
    </Router>
  );
}
export default App;
