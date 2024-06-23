
import React from 'react';

const Column = ({ innerRef, droppableProps, placeholder, status, renderTasks, tasks }) => {
  return (
    <div ref={innerRef} {...droppableProps} className="column">
      <h2>{status.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
      {renderTasks(tasks, status)}
      {placeholder}
    </div>
  );
};

export default Column;