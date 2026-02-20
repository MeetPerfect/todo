import React, { useState } from 'react';
import { Todo, Priority } from '../types/Todo.types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateText: (id: number, newText: string) => void;
  onUpdatePriority: (id: number, newPriority: Priority) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdateText,
  onUpdatePriority,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEditSubmit = () => {
    if (editText.trim()) {
      onUpdateText(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdatePriority(todo.id, e.target.value as Priority);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return '#e74c3c'; // Red for high priority
      case 'medium':
        return '#f39c12'; // Orange for medium priority
      case 'low':
        return '#27ae60'; // Green for low priority
      default:
        return '#95a5a6';
    }
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
            autoFocus
            className="edit-input"
          />
        ) : (
          <span
            className="task-text"
            onDoubleClick={() => setIsEditing(true)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="task-details">
        <div
          className="priority-indicator"
          title={`优先级: ${todo.priority}`}
          style={{
            color: getPriorityColor(todo.priority),
            fontWeight: 'bold',
          }}
        >
          {todo.priority === 'high' ? '🔴 高' :
           todo.priority === 'medium' ? '🟡 中' : '🟢 低'}
        </div>
        <div className="created-at">
          {formatDate(todo.createdAt)}
        </div>
      </div>
      <div className="task-actions">
        <select
          value={todo.priority}
          onChange={handlePriorityChange}
          className="priority-dropdown"
          style={{ color: getPriorityColor(todo.priority) }}
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
        <button
          className={`complete-btn ${todo.completed ? 'completed' : ''}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? '撤销' : '完成'}
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>
          删除
        </button>
      </div>
    </li>
  );
};

export default TodoItem;