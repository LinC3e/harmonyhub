import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePages';
import NotFound from './pages/NotFound';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/'element = {<HomePage/>} />
        <Route path='/login'element = {<LoginPage/>} />
        <Route path='/register'element = {<RegisterPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  
  )
}

export default App