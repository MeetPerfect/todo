import React from 'react';
import { Todo } from '../types/Todo.types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateText: (id: number, newText: string) => void;
  onUpdatePriority: (id: number, newPriority: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdateText,
  onUpdatePriority,
}) => {
  if (todos.length === 0) {
    return <div className="empty-list">暂无待办事项</div>;
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