import React, { useState } from 'react';
import { Priority } from '../types/Todo.types';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

interface TodoInputProps {
  addTodo: (text: string, priority: Priority, dueDate?: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue, priority, dueDate || undefined);
      setInputValue('');
      setDueDate('');
      setPriority('medium');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-section">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('taskPlaceholder', language)}
        className="task-input"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="priority-select"
      >
        <option value="high">{t('priorityHigh', language)}</option>
        <option value="medium">{t('priorityMedium', language)}</option>
        <option value="low">{t('priorityLow', language)}</option>
      </select>
      <div className="due-date-field">
        <label htmlFor="todo-due-date" className="due-date-label">
          {t('dueDateLabel', language)}
        </label>
        <input
          id="todo-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="due-date-input"
          aria-label={t('dueDateLabel', language)}
        />
      </div>
      <button type="submit" id="addBtn">
        {t('addButton', language)}
      </button>
    </form>
  );
};

export default TodoInput;
