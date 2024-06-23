import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTask, updateTask, deleteTask } from '../features/TasksSlice';
import Board from './Board';
import Task from './Task'; 
import TaskModal from '../Taskmodal';
import { persistor } from '../app/Store';
import Navbar from './navbar/Navbar';


const KanbanApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const tasks = useSelector((state) => state.tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);



    const name = localStorage.getItem('name');



    


  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const task = tasks[source.droppableId][source.index];
    dispatch(updateTask({ ...task, status: destination.droppableId }));
  };

  const handleSaveTask = async(content) => {
    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, status: editingTask.status, content }));
    } else {
      const id = new Date().toISOString();
      dispatch(addTask({ id, content }));
    }
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await persistor.purge();
    localStorage.removeItem('token');
    localStorage.removeItem('name');
   
    navigate('/');;
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask({ id }));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const renderTasks = (tasks, status) => (
    tasks[status].map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        onDelete={handleDeleteTask}
        onEdit={() => handleEditTask({ ...task, status })}
      />
    ))
  );

  return (
    <div className="app">
      <Navbar onAddTask={() => setIsModalOpen(true)} name={name} logout={handleLogout} />
      <Board tasks={tasks} onDragEnd={handleDragEnd} renderTasks={renderTasks} />
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialContent={editingTask ? editingTask.content : ''}
      />
    </div>
  );
};

export default KanbanApp;