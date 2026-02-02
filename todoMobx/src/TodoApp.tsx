
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { todoStore } from './TodoStore';

const TodoApp = observer(() => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      todoStore.addTodo(inputValue);
      setInputValue("");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>MobX Todo List</h2>
      
      {/* Hiển thị Computed Value */}
      <p>Công việc còn lại: <strong>{todoStore.remainingTodos}</strong></p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nhập việc cần làm..."
        />
        <button onClick={handleAdd}>Thêm</button>
      </div>

      <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
        {todoStore.todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span 
              onClick={() => todoStore.toggleTodo(todo.id)}
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer' 
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => todoStore.deleteTodo(todo.id)} style={{ color: 'red' }}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TodoApp;