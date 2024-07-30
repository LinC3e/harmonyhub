import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/layouts/footer';
import Header from './components/layouts/Header';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePages';
import NotFound from './pages/NotFound';
import AlbumPage from './pages/AlbumPage';

// Auth
import { AuthProvider } from './hooks/authContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex min-h-screen">
          <Header className="w-2/5 min-w-max" />
          <div className="flex-grow flex flex-col">
            <div className="flex-grow">
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/albums' element={<AlbumPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer className="flex-shrink-0" />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App