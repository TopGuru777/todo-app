import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddTaskForm from './AddTaskForm';
import { addTask } from '../features/tasks/tasksSlice';

const mockStore = configureStore([]);
jest.mock('uuid', () => ({ v4: () => '1234' }));
jest.mock('../features/tasks/tasksSlice', () => ({
  addTask: jest.fn(),
}));

describe('AddTaskForm', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  test('submits form and dispatches addTask action', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <AddTaskForm />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText(/Task title/i), { target: { value: 'New Task' } });
    fireEvent.change(getByPlaceholderText(/Task description/i), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByTestId('due-date-input'), { target: { value: '2023-11-01' } });

    fireEvent.click(getByText(/Add Task/i));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(addTask({
      id: '1234',
      title: 'New Task',
      description: 'New Description',
      status: 'Pending',
      dueDate: '2023-11-01',
    }));
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <AddTaskForm />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});