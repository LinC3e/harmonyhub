import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/layouts/footer';
import Header from './components/layouts/Header';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePages';
import NotFound from './pages/NotFound';
import AlbumPage from './pages/AlbumPage';

function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/'element = {<HomePage/>} />
        <Route path='/login'element = {<LoginPage/>} />
        <Route path='/register'element = {<RegisterPage/>} />
        <Route path='/albums'element = {<AlbumPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  
  )
}

export default App