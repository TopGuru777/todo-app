import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { editTask, deleteTask } from '../features/tasks/tasksSlice';
import { toast } from 'react-toastify';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    dueDate: string;
  };
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);

  const handleSave = useCallback(() => {
    dispatch(editTask({ ...task, title, description, dueDate, status }));
    setIsEditing(false);
    toast.success('Task updated successfully!');
  }, [dispatch, task, title, description, dueDate, status]);

  const handleCancel = useCallback(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setStatus(task.status);
    setIsEditing(false);
  }, [task]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTask(task.id));
    setIsModalOpen(false);
    toast.error('Task deleted!');
  }, [dispatch, task.id]);

  const statusBadgeColor = {
    'Pending': 'bg-yellow-500',
    'In Progress': 'bg-blue-500',
    'Completed': 'bg-green-500',
  };

  return (
    <>
      <div
        className="bg-white shadow-md rounded p-4 mb-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <div>
          <h3 className="text-lg font-bold truncate w-full">{task.title}</h3>
          <p className="truncate w-full text-sm">{task.description}</p>
          <p className={`text-sm ${new Date(task.dueDate) < new Date() ? 'text-red-500' : ''}`}>
            Due: {task.dueDate}
          </p>
        </div>
        <span className={`text-white text-xs font-semibold px-2 py-1 rounded ${statusBadgeColor[task.status]}`}>
          {task.status}
        </span>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Task Details"
        className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto mt-24 relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {!isEditing ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="mb-2">{description}</p>
            <p className="mb-4 text-sm">Due: {dueDate}</p>
            <span className={`text-white text-xs font-semibold px-2 py-1 rounded ${statusBadgeColor[status]}`}>
              {status}
            </span>
            <div className="mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              placeholder="Task Title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              placeholder="Task Description"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Pending' | 'In Progress' | 'Completed')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="mt-6">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
});

export default TaskItem;