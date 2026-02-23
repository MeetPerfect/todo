import React from 'react';
import { FilterType } from '../types/Todo.types';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ currentFilter, onFilterChange }) => {
  const { language } = useLanguage();

  return (
    <div className="filters">
      <button
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
        data-filter="all"
      >
        {t('filterAll', language)}
      </button>
      <button
        className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
        data-filter="active"
      >
        {t('filterActive', language)}
      </button>
      <button
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
        data-filter="completed"
      >
        {t('filterCompleted', language)}
      </button>
    </div>
  );
};

export default TodoFilters;