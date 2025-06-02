import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterLoginPage from './pages/RegisterLoginPage';
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainPage />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/books/:id" element={<DetailPage />} />
//         <Route path="/books/edit/:id" element={<EditPage />} />
        
//       </Routes>
//     </Router>
//   );
// }
// export default App;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/books/:id" element={<DetailPage />} />
        <Route path="/books/edit/:id" element={<EditPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterLoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
export default App;
