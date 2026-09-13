import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CompletePage from './pages/CompletePage';

// ログイン済み（トークンがある）かどうかを確認する部品
function PrivateRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    // トークンがなければ、強制的にログイン画面へ飛ばす
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
          />
          <Route
              path="/complete"
              element={
                <PrivateRoute>
                  <CompletePage />
                </PrivateRoute>
              }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;