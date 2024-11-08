import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { updateTasks } from '../features/tasks/tasksSlice'

const TaskList: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');
  const [search, setSearch] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      return (filter === 'All' || task.status === filter) &&
        task.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [tasks, filter, search]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(filteredTasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    console.log('Reordered Tasks:', reorderedTasks);
    dispatch(updateTasks(reorderedTasks));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'All' | 'Pending' | 'In Progress' | 'Completed')}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No Items</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
});

export default TaskList;