import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

interface TodoStatsProps {
  total: number;
  active: number;
  completed: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ total, active, completed }) => {
  const { language } = useLanguage();

  return (
    <div className="stats">
      <span id="taskStats">
        {t('statsTotal', language)}: {total} | {t('statsActive', language)}: {active} | {t('statsCompleted', language)}: {completed}
      </span>
    </div>
  );
};

export default TodoStats;