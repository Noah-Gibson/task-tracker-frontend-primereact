import React, { useState, useEffect } from 'react';
import { getTasks } from './api/tasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  const updateTaskList = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1rem',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Task Tracker</h1>
      <TaskForm onTaskCreated={updateTaskList} />
      <TaskList
        tasks={tasks}
        onTaskDeleted={(id) => setTasks(prevTasks => prevTasks.filter(t => t.id !== id))}
      />
    </div>
  );
}

export default App;