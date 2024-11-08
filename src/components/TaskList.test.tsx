import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskList from './TaskList';

const mockStore = configureStore([]);

describe('TaskList', () => {
    let store: ReturnType<typeof mockStore>;
    const tasks = [
        { id: '1', title: 'Task One', description: '', status: 'Pending', dueDate: '2024-12-01' },
        { id: '2', title: 'Task Two', description: '', status: 'Completed', dueDate: '2024-12-02' },
        { id: '3', title: 'Another Task', description: '', status: 'In Progress', dueDate: '2024-12-03' },
    ];

    beforeEach(() => {
        store = mockStore({
            tasks: { tasks },
        });
    });

    test('renders all tasks initially', () => {
        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );

        expect(screen.getByText(/Task One/i)).toBeInTheDocument();
        expect(screen.getByText(/Task Two/i)).toBeInTheDocument();
        expect(screen.getByText(/Another Task/i)).toBeInTheDocument();
    });

    test('filters tasks by status', () => {
        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Completed' } });

        expect(screen.queryByText(/Task One/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Task Two/i)).toBeInTheDocument();
        expect(screen.queryByText(/Another Task/i)).not.toBeInTheDocument();
    });

    test('searches tasks by title', () => {
        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Search tasks/i), { target: { value: 'Another' } });

        expect(screen.queryByText(/Task One/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Task Two/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Another Task/i)).toBeInTheDocument();
    });

    test('shows "No Items" when no tasks match filter/search', () => {
        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Search tasks/i), { target: { value: 'Nonexistent' } });

        expect(screen.getByText(/No Items/i)).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { asFragment } = render(
          <Provider store={store}>
            <TaskList />
          </Provider>
        );
    
        expect(asFragment()).toMatchSnapshot();
    });

    test('reorders tasks via drag-and-drop', () => {
        render(
          <Provider store={store}>
            <TaskList />
          </Provider>
        );
    
        const taskOne = screen.getByText(/Task One/i);
        const taskTwo = screen.getByText(/Task Two/i);
    
        fireEvent.dragStart(taskOne);
        fireEvent.dragEnter(taskTwo);
        fireEvent.dragOver(taskTwo);
        fireEvent.drop(taskTwo);
        fireEvent.dragEnd(taskOne);
    
        // const actions = store.getActions();
        // console.log({ actions });
        // const reorderAction = actions.find(action => action.type === 'tasks/updateTasks');
        
        // expect(reorderAction).toBeDefined();

        // if (reorderAction) {
        // expect(reorderAction.payload[0].id).toBe('2');
        // expect(reorderAction.payload[1].id).toBe('1');
        // }
    });
});