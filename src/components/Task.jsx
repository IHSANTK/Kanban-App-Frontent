
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index, onDelete, onEdit }) => {
  const myStyle = {
   color: 'red',
  };
  
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task"
        >
          {task.content}
          <div className="task-buttons">
            <button onClick={() => onDelete(task.id)} style={myStyle}><i class="fa-solid fa-trash"></i></button>
            <button onClick={() => onEdit(task)}><i class="fa-regular fa-pen-to-square"></i></button>
          </div>
        </div>
      )}
    </Draggable>
  );
 
};

export default Task;