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
    searchTerm,
    setSearchTerm,
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

        <div className="search-section">
          <label htmlFor="todo-search" className="search-label">
            {t('searchLabel', language)}
          </label>
          <input
            id="todo-search"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={t('searchPlaceholder', language)}
            className="search-input"
            aria-label={t('searchLabel', language)}
          />
        </div>

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
