import React from 'react';
import { FilterType } from '../types/Todo.types';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filters">
      <button
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
        data-filter="all"
      >
        全部
      </button>
      <button
        className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
        data-filter="active"
      >
        未完成
      </button>
      <button
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
        data-filter="completed"
      >
        已完成
      </button>
    </div>
  );
};

export default TodoFilters;