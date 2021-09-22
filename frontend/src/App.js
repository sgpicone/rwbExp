import logo from './logo.svg';
import './App.css';
import './styles.scss';
import AppRouter from './router/AppRouter';
import { useEffect } from 'react';
import { getKegs } from './actions/kegActions';

function App() {
  useEffect(() => {
    getKegs();
  });
  return (
    <AppRouter />
  );
}

export default App;
