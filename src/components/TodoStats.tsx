import React from 'react';

interface TodoStatsProps {
  total: number;
  active: number;
  completed: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ total, active, completed }) => {
  return (
    <div className="stats">
      <span id="taskStats">
        总计: {total} | 未完成: {active} | 已完成: {completed}
      </span>
    </div>
  );
};

export default TodoStats;