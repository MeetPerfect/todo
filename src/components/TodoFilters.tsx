import React from 'react';
import { FilterType } from '../types/Todo.types';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filterOptions: Array<{ value: FilterType; labelKey: 'filterAll' | 'filterActive' | 'filterCompleted' | 'filterToday' | 'filterOverdue' }> = [
  { value: 'all', labelKey: 'filterAll' },
  { value: 'active', labelKey: 'filterActive' },
  { value: 'completed', labelKey: 'filterCompleted' },
  { value: 'today', labelKey: 'filterToday' },
  { value: 'overdue', labelKey: 'filterOverdue' },
];

const TodoFilters: React.FC<TodoFiltersProps> = ({ currentFilter, onFilterChange }) => {
  const { language } = useLanguage();

  return (
    <div className="filters">
      {filterOptions.map((filter) => (
        <button
          key={filter.value}
          className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
          data-filter={filter.value}
        >
          {t(filter.labelKey, language)}
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;
