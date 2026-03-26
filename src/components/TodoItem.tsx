import React, { useMemo, useState } from 'react';
import { Todo, Priority } from '../types/Todo.types';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateText: (id: number, newText: string) => void;
  onUpdatePriority: (id: number, newPriority: Priority) => void;
}

const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdateText,
  onUpdatePriority,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { language } = useLanguage();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    if (language === 'zh') {
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDueDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);

    if (language === 'zh') {
      return localDate.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }

    return localDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
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
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const getPriorityDisplay = (priority: Priority) => {
    if (priority === 'high') return t('priorityHigh', language);
    if (priority === 'medium') return t('priorityMedium', language);
    return t('priorityLow', language);
  };

  const dueDateState = useMemo(() => {
    if (!todo.dueDate) {
      return { isToday: false, isOverdue: false };
    }

    const today = getTodayDateString();
    return {
      isToday: !todo.completed && todo.dueDate === today,
      isOverdue: !todo.completed && todo.dueDate < today,
    };
  }, [todo.completed, todo.dueDate]);

  return (
    <li className={`${todo.completed ? 'completed' : ''} ${dueDateState.isOverdue ? 'overdue-item' : ''} ${dueDateState.isToday ? 'today-item' : ''}`}>
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
          title={getPriorityDisplay(todo.priority)}
          style={{
            color: getPriorityColor(todo.priority),
            fontWeight: 'bold',
          }}
        >
          {getPriorityDisplay(todo.priority)}
        </div>
        {todo.dueDate && (
          <div className="due-date-meta">
            <span className="due-date-text">
              {t('dueDateDisplay', language)}: {formatDueDate(todo.dueDate)}
            </span>
            {dueDateState.isOverdue && (
              <span className="due-date-status overdue">{t('dueDateOverdue', language)}</span>
            )}
            {!dueDateState.isOverdue && dueDateState.isToday && (
              <span className="due-date-status today">{t('dueDateToday', language)}</span>
            )}
          </div>
        )}
        <div className="created-at">{formatDateTime(todo.createdAt)}</div>
      </div>
      <div className="task-actions">
        <select
          value={todo.priority}
          onChange={handlePriorityChange}
          className="priority-dropdown"
          style={{ color: getPriorityColor(todo.priority) }}
        >
          <option value="high">{t('priorityHigh', language)}</option>
          <option value="medium">{t('priorityMedium', language)}</option>
          <option value="low">{t('priorityLow', language)}</option>
        </select>
        <button
          className={`complete-btn ${todo.completed ? 'completed' : ''}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? t('actionUndo', language) : t('actionComplete', language)}
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>
          {t('actionDelete', language)}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
