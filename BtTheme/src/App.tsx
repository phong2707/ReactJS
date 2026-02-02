import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import  ThemeButton from './ThemeButton';

function App() {
  const {theme}  = useContext(ThemeContext);

  return (
    <div style={{backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'}}>
      <h1>Xin chào, đây là chế độ {theme}</h1>
      <ThemeButton />
    </div>
  );
}

export default App;