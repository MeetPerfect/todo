export type Priority = 'high' | 'medium' | 'low';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: string; // ISO datetime string
  dueDate?: string; // YYYY-MM-DD date string
}

export type FilterType = 'all' | 'active' | 'completed' | 'today' | 'overdue';
