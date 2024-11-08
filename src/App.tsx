import React from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">To-Do Application</h1>
        <AddTaskForm />
        <div className='mt-4'>
          <TaskList />
        </div>
      </div>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;