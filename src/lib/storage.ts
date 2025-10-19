import { Task, Expense, Budget, CalendarEvent, Document, GroceryItem, MealPlan } from '@/types';

// Generic storage helpers
const getStorageKey = (key: string) => `familyhub_${key}`;

export const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(getStorageKey(key));
  return data ? JSON.parse(data) : [];
};

export const saveToStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(getStorageKey(key), JSON.stringify(data));
};

// Tasks
export const getTasks = () => getFromStorage<Task>('tasks');
export const saveTasks = (tasks: Task[]) => saveToStorage('tasks', tasks);

// Expenses
export const getExpenses = () => getFromStorage<Expense>('expenses');
export const saveExpenses = (expenses: Expense[]) => saveToStorage('expenses', expenses);

// Budgets
export const getBudgets = () => getFromStorage<Budget>('budgets');
export const saveBudgets = (budgets: Budget[]) => saveToStorage('budgets', budgets);

// Calendar Events
export const getCalendarEvents = () => getFromStorage<CalendarEvent>('events');
export const saveCalendarEvents = (events: CalendarEvent[]) => saveToStorage('events', events);

// Documents
export const getDocuments = () => getFromStorage<Document>('documents');
export const saveDocuments = (documents: Document[]) => saveToStorage('documents', documents);

// Grocery List
export const getGroceryItems = () => getFromStorage<GroceryItem>('grocery');
export const saveGroceryItems = (items: GroceryItem[]) => saveToStorage('grocery', items);

// Meal Plans
export const getMealPlans = () => getFromStorage<MealPlan>('meals');
export const saveMealPlans = (meals: MealPlan[]) => saveToStorage('meals', meals);
