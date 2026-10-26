import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode는 개발 모드에서 Canvas를 한 번 해제했다 다시 붙이는데,
  // @react-three/fiber 9.3이 그때 WebGL 컨텍스트를 끊어 3D 사원증이 하얗게 보여서 사용하지 않는다.
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);