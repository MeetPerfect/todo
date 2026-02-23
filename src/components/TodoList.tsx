import React from 'react';
import { Todo, Priority } from '../types/Todo.types';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateText: (id: number, newText: string) => void;
  onUpdatePriority: (id: number, newPriority: Priority) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdateText,
  onUpdatePriority,
}) => {
  const { language } = useLanguage();

  if (todos.length === 0) {
    return <div className="empty-list">{t('emptyList', language)}</div>;
  }

  return (
    <ul id="taskList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdateText={onUpdateText}
          onUpdatePriority={onUpdatePriority}
        />
      ))}
    </ul>
  );
};

export default TodoList;