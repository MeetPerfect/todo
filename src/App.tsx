import React from 'react';
import useTodos from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import TodoStats from './components/TodoStats';
import { FilterType } from './types/Todo.types';
import './App.css';

const App: React.FC = () => {
  const {
    filteredTodos,
    currentFilter,
    setCurrentFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodoText,
    updateTodoPriority,
    stats,
  } = useTodos();

  return (
    <div className="container">
      <h1>待办事项列表</h1>

      <TodoInput addTodo={addTodo} />

      <TodoFilters
        currentFilter={currentFilter as FilterType}
        onFilterChange={setCurrentFilter}
      />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdateText={updateTodoText}
        onUpdatePriority={updateTodoPriority}
      />

      <TodoStats
        total={stats.total}
        active={stats.active}
        completed={stats.completed}
      />
    </div>
  );
};

export default App;