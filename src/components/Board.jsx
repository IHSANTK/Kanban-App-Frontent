
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

const Board = ({ tasks, onDragEnd, renderTasks }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns">
        {['todo', 'inProgress', 'completed'].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <Column
                innerRef={provided.innerRef}
                droppableProps={provided.droppableProps}
                placeholder={provided.placeholder}
                status={status}
                renderTasks={renderTasks}
                tasks={tasks}
              />
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;