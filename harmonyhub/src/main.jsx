import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes/Router'
import { SongProvider } from './context/SongContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SongProvider>
    <RouterProvider router={Router} />
  </SongProvider>
);
