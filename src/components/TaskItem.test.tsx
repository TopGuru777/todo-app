import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskItem from './TaskItem';
import { editTask, deleteTask, Task } from '../features/tasks/tasksSlice';
import { ToastContainer } from 'react-toastify';

const mockStore = configureStore([]);
jest.mock('../features/tasks/tasksSlice', () => ({
  editTask: jest.fn(),
  deleteTask: jest.fn(),
}));

describe('TaskItem', () => {
  let store: ReturnType<typeof mockStore>;
  const task: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending',
    dueDate: '2024-11-08',
  };

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  test('edits a task', () => {
    render(
      <Provider store={store}>
        <TaskItem task={task} />
        <ToastContainer />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Test Task/i));
    fireEvent.click(screen.getByText(/Edit/i));

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), {
      target: { value: 'Updated Task' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Task Description/i), {
      target: { value: 'Updated Description' },
    });
    fireEvent.click(screen.getByText(/Save/i));

    expect(store.dispatch).toHaveBeenCalledWith(
      editTask({
        ...task,
        title: 'Updated Task',
        description: 'Updated Description',
      })
    );
  });

  test('deletes a task', () => {
    render(
      <Provider store={store}>
        <TaskItem task={task} />
        <ToastContainer />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Test Task/i));
    fireEvent.click(screen.getByText(/Edit/i));
    fireEvent.click(screen.getByText(/Delete/i));

    expect(store.dispatch).toHaveBeenCalledWith(deleteTask(task.id));
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TaskItem task={task} />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});