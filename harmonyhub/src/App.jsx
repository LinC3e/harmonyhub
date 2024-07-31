import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// Layouts
import Footer from './components/layouts/footer';
import Header from './components/layouts/Header';
// App
import HomePage from './pages/HomePages';
import SongsPage from './pages/SongsPage';
import SongDetailPage from './pages/SongDetailPage';
import AlbumPage from './pages/AlbumPage';
import NotFound from './pages/NotFound';
// Auth
import LoginPage from './pages/LoginPage';
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
                <Route path='/albums' element={<AlbumPage />} />
                <Route path='/songs' element={<SongsPage />} />
                <Route path='/songs/:id' element={<SongDetailPage />} />
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