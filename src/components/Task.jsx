

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

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
            <button onClick={() => onDelete(task.id)} style={myStyle}><MdDeleteOutline size={20} /></button>
            <button onClick={() => onEdit(task)}><FaEdit size={15} /></button>
          </div>
        </div>
      )}
    </Draggable>
  );
 
};

export default Task;
