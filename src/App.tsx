import React from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { t } from './i18n';
import useTodos from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import TodoStats from './components/TodoStats';
import LanguageToggle from './components/LanguageToggle';
import './App.css';

const AppContent: React.FC = () => {
  const { language } = useLanguage();
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
    <>
      <LanguageToggle />
      <div className="container">
        <h1>{t('appHeading', language)}</h1>

        <TodoInput addTodo={addTodo} />

        <TodoFilters
          currentFilter={currentFilter}
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
          today={stats.today}
          overdue={stats.overdue}
        />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
