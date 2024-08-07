import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// Layouts
import Footer from './components/layouts/footer';
import Header from './components/layouts/Header';
// App
import AlbumPage from './pages/AlbumPage';
import HomePage from './pages/HomePages';
import NotFound from './pages/NotFound';
import SongDetailPage from './pages/SongDetailPage';
import SongsPage from './pages/SongsPage';
// Auth
import { AuthProvider } from './hooks/authContext';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-grow">
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
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;