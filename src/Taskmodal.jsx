import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TaskModal = ({ isOpen, onClose, onSave, initialContent }) => {
  const [content, setContent] = useState(initialContent || '');

  useEffect(() => {
    setContent(initialContent || '');
  }, [initialContent]);

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      setContent('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Task"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{initialContent ? 'Edit Task' : 'Add Task'}</h2>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Task content"
        className="task-input"
      />
      <div className="modal-buttons">
        <button onClick={handleSave} className="button save-button">Save</button>
        <button onClick={onClose} className="button cancel-button">Cancel</button>
      </div>
    </Modal>
  );
};

export default TaskModal;