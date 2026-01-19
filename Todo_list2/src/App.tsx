import './App.css'
import { useState } from 'react'

function App() {

  type task = {
    id: number;
    name: string;
    status: 'To Do' | 'In Progress' | 'Done';
    createdAt: Date;
  }

  const [tasks, setTasks] = useState<task[]>([
    {id: 1, name: 'Demo task', status: 'To Do', createdAt: new Date('2019-04-15T21:25:00')},
    {id: 2, name: 'Demo task', status: 'Done', createdAt: new Date('2019-04-15T21:25:00')},
    {id: 3, name: 'Demo task', status: 'In Progress', createdAt: new Date('2019-04-15T21:25:00')},
    {id: 4, name: 'Demo task', status: 'To Do', createdAt: new Date('2019-04-15T21:25:00')},
    {id: 5, name: 'Demo task', status: 'To Do', createdAt: new Date('2019-04-15T21:25:00')},
  ]);

  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState<'To Do' | 'In Progress' | 'Done'>('To Do');
  const [editId, setEditId] = useState<number | null>(null);


  const saveTask = () => {
    if (taskName.trim() === '') return;
    if (editId !== null) {
      const updatedTasks = tasks.map(task =>
        task.id === editId
          ? { ...task, name: taskName, status: taskStatus }
          : task
      );
      setTasks(updatedTasks);
    }

    else {
      const newTask: task = {
        id: Date.now(),
        name: taskName,
        status: taskStatus,
        createdAt: new Date(),
      };
      setTasks([...tasks, newTask]);
    }

    setTaskName('');
    setTaskStatus('To Do');
    setEditId(null);
  };
  const cancelAddTask = () => {
    setTaskName('');
    setTaskStatus('To Do');
  }
  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }
  const editTask = (id: number) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (!taskToEdit) return;
    setEditId(taskToEdit.id);
    setTaskName(taskToEdit.name);
    setTaskStatus(taskToEdit.status);
  }
  const countTasksByStatus = (status: 'To Do' | 'In Progress' | 'Done') => {
    return tasks.filter(task => task.status === status).length;
  }

  return (
    <>
      <div className="myApp">
        <h2 className="text-center my-4 text-uppercase fw-bold text-primary">TO DO LIST</h2>

        <div className="addTask mx-auto">
          <h5 className="mb-3 text-center">{editId == null ? 'Add new task' : 'Update task'}</h5>

          <div className="d-flex justify-content-center gap-3 mb-3">
            <label>
              <input type="radio" name="status" value="To Do" checked={taskStatus === 'To Do'} onChange={(e) => setTaskStatus(e.target.value as 'To Do')} /> Todo
            </label>
            <label>
              <input type="radio" name="status" value="In Progress" checked={taskStatus === 'In Progress'} onChange={(e) => setTaskStatus(e.target.value as 'In Progress')} /> In progress
            </label>
            <label>
              <input type="radio" name="status" value="Done" checked={taskStatus === 'Done'} onChange={(e) => setTaskStatus(e.target.value as 'Done')} /> Done
            </label>
          </div>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <div className="text-center">
            <button className="btn btn-primary me-2" onClick={saveTask}>{editId !== null ? 'Update' : 'Save'}</button>
            <button className="btn btn-secondary" onClick={cancelAddTask}>Cancel</button>
          </div>
        </div>

        <div className="inner mt-5">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="kanban-column">
                <div className="kanban-header">
                  <span className="badge bg-primary">{countTasksByStatus('To Do')}</span>
                  <span>TO DO</span>
                  <button className="btn btn-sm btn-outline-primary">
                    + New task
                  </button>
                </div>
                <div className="kanban-body">
                  <div className="task-item">
                    {tasks.filter(task => task.status === 'To Do').map(task => (
                      <div key={task.id} className="task-item">
                        <small><i className="bi bi-calendar2-week"></i> {task.createdAt.toLocaleString()}</small>
                        <div className="task-actions d-flex justify-content-between align-items-center mt-2">
                          <p>{task.name}</p>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => editTask(task.id)}>
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="kanban-column">
                <div className="kanban-header">
                  <span className="badge bg-primary">{countTasksByStatus('In Progress')}</span>
                  <span>IN PROGRESS</span>
                  <button className="btn btn-sm btn-outline-primary">
                    + New task
                  </button>
                </div>
                <div className="kanban-body">
                  <div className="task-item">
                    {tasks.filter(task => task.status === 'In Progress').map(task => (
                      <div key={task.id} className="task-item">
                        <small><i className="bi bi-calendar2-week"></i> {task.createdAt.toLocaleString()}</small>
                        <div className="task-actions d-flex justify-content-between align-items-center mt-2">
                          <p>{task.name}</p>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => editTask(task.id)}>
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
             
            </div>
            <div className="col-md-4">
              <div className="kanban-column">
                <div className="kanban-header">
                  <span className="badge bg-primary">{countTasksByStatus('Done')}</span>
                  <span>DONE</span>
                  <button className="btn btn-sm btn-outline-primary">
                    + New task
                  </button>
                </div>
                <div className="kanban-body">
                  <div className="task-item">
                    {tasks.filter(task => task.status === 'Done').map(task => (
                      <div key={task.id} className="task-item">
                        <small><i className="bi bi-calendar2-week"></i> {task.createdAt.toLocaleString()}</small>
                        <div className="task-actions d-flex justify-content-between align-items-center mt-2">
                          <p>{task.name}</p>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => editTask(task.id)}>
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
export default App
