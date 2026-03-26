import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

interface TodoStatsProps {
  total: number;
  active: number;
  completed: number;
  today: number;
  overdue: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ total, active, completed, today, overdue }) => {
  const { language } = useLanguage();

  return (
    <div className="stats">
      <span id="taskStats">
        {t('statsTotal', language)}: {total} | {t('statsActive', language)}: {active} | {t('statsCompleted', language)}: {completed} | {t('statsToday', language)}: {today} | {t('statsOverdue', language)}: {overdue}
      </span>
    </div>
  );
};

export default TodoStats;
