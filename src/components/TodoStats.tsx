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

  const primaryStats = [
    { key: 'total', label: t('statsTotal', language), value: total },
    { key: 'active', label: t('statsActive', language), value: active },
    { key: 'completed', label: t('statsCompleted', language), value: completed },
  ];

  const dueStats = [
    { key: 'today', label: t('statsToday', language), value: today },
    { key: 'overdue', label: t('statsOverdue', language), value: overdue },
  ];

  return (
    <div className="stats" aria-label={t('statsTotal', language)}>
      <div className="stats-group stats-group-primary" id="taskStats">
        {primaryStats.map((stat) => (
          <div key={stat.key} className="stats-card">
            <span className="stats-label">{stat.label}</span>
            <strong className="stats-value">{stat.value}</strong>
          </div>
        ))}
      </div>

      <div className="stats-group stats-group-secondary" aria-label={t('statsToday', language)}>
        {dueStats.map((stat) => (
          <div key={stat.key} className={`stats-card stats-card-${stat.key}`}>
            <span className="stats-label">{stat.label}</span>
            <strong className="stats-value">{stat.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoStats;
