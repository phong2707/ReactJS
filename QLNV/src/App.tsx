import StaffForm from "./components/StaffForm";
import StaffList from "./components/StaffList";
import './App.css';


function App() {
  return (
    <div style={{ maxWidth: '', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Quản lý Nhân sự Công ty</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '500px 1fr',
        gap: '40px',
        alignItems: 'start' 
      }}>
        <div>
          <StaffForm />
        </div>
        <div>
          <StaffList />
        </div>
      </div>
    </div>
  );
}
export default App;