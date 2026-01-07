import { useState } from 'react'
import './app.css'
function App() {

  const [inputadd, setInputAdd] = useState('');

  const [todo, setTodos] = useState([
      {name: "Personal Work No. 1", done: true},
      {name: "Personal Work No. 2", done: false},
      {name: "Personal Work No. 3", done: false},
  ]);

  const handleAddTodo = () => {
  if (inputadd.trim() === "") return;

  const newTodo = {
    name: inputadd,
    done: false,
  };

  setTodos([...todo, newTodo]);
  setInputAdd("");
};

const handleDeleteTodo = (index: number) => {
  const newTodo = [...todo];
  newTodo.splice(index, 1);
  setTodos(newTodo);
};

const handleToggleTodo = (index: number) => {
  const newTodo = [...todo];
  newTodo[index].done = !newTodo[index].done;
  setTodos(newTodo);
};

  return (
    <>
      <div className="app" style={{
        height: 'auto',
        maxWidth: '800px',
        margin:'30px auto'
      }}>
        <div className='addApp' style={{
          display: 'flex',
          gap: '0',
          marginBottom: '40px'
        }}>
          <input type="text" placeholder='What do you need to do' value={inputadd} onChange={(e) => setInputAdd(e.target.value)} />
          <button onClick={handleAddTodo}>Add</button>
        </div>
       <ul className="todo-list">
        {
          todo.map((todo, index) => (
            <li key={index}>
              <input type="checkbox" checked={todo.done} onChange={() => handleToggleTodo(index)}/>
              <span>{todo.name}</span>
              <button onClick={() => handleDeleteTodo(index)}>🗑</button>
              </li>
          ))
        }
       </ul>
      </div>
    </>
  )
}

export default App
