import { useTheme } from './context/ThemeContext';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme(); // TS tự biết theme là 'light' | 'dark'

  return (
    <button 
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#000' : '#fff',
        color: theme === 'light' ? '#fff' : '#000',
        padding: '10px 20px',
        cursor: 'pointer'
      }}
    >
      Đổi sang giao diện {theme === 'light' ? 'Tối' : 'Sáng'}
    </button>
  );
};

export default ThemeButton;