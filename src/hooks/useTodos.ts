import { useEffect, useMemo, useState } from 'react';
import { Todo, FilterType, Priority } from '../types/Todo.types';

const STORAGE_KEY = 'todos';
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const normalizePriority = (value: unknown): Priority => {
  if (value === 'high' || value === 'medium' || value === 'low') {
    return value;
  }

  return 'medium';
};

const normalizeDueDate = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();

  if (!DATE_PATTERN.test(trimmedValue)) {
    return undefined;
  }

  const [year, month, day] = trimmedValue.split('-').map(Number);
  const localDate = new Date(year, month - 1, day);

  if (
    Number.isNaN(localDate.getTime()) ||
    localDate.getFullYear() !== year ||
    localDate.getMonth() !== month - 1 ||
    localDate.getDate() !== day
  ) {
    return undefined;
  }

  return trimmedValue;
};

const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const isDueToday = (todo: Todo) => todo.dueDate !== undefined && todo.dueDate === getTodayDateString();

const isOverdue = (todo: Todo) => todo.dueDate !== undefined && !todo.completed && todo.dueDate < getTodayDateString();

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);

        if (!Array.isArray(parsedTodos)) {
          return [];
        }

        return parsedTodos.map((todo: Partial<Todo> & { timestamp?: string }) => ({
          id: todo.id ?? Date.now(),
          text: typeof todo.text === 'string' ? todo.text : '',
          completed: Boolean(todo.completed),
          priority: normalizePriority(todo.priority),
          createdAt: todo.createdAt ?? todo.timestamp ?? new Date().toISOString(),
          dueDate: normalizeDueDate(todo.dueDate),
        }));
      } catch (error) {
        console.error('Failed to parse todos from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Priority = 'medium', dueDate?: string) => {
    if (text.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      dueDate: normalizeDueDate(dueDate),
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const updateTodoText = (id: number, newText: string) => {
    if (newText.trim() === '') return;

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const updateTodoPriority = (id: number, newPriority: Priority) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, priority: newPriority } : todo
      )
    );
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        if (currentFilter === 'today') return !todo.completed && isDueToday(todo);
        if (currentFilter === 'overdue') return isOverdue(todo);
        return true;
      }),
    [currentFilter, todos]
  );

  const stats = useMemo(
    () => ({
      total: todos.length,
      active: todos.filter((todo) => !todo.completed).length,
      completed: todos.filter((todo) => todo.completed).length,
      today: todos.filter((todo) => !todo.completed && isDueToday(todo)).length,
      overdue: todos.filter((todo) => isOverdue(todo)).length,
    }),
    [todos]
  );

  return {
    todos,
    filteredTodos,
    currentFilter,
    setCurrentFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodoText,
    updateTodoPriority,
    stats,
  };
};

export default useTodos;
