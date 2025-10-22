export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'child' | 'admin';
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  points: number;
  createdAt: string;
  completedAt?: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  paidBy: string;
  recurring: boolean;
  createdAt: string;
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  month: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  attendees: string[];
  color: string;
  recurring: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'medical' | 'insurance' | 'school' | 'identification' | 'other';
  uploadedBy: string;
  uploadedAt: string;
  fileData: string; // base64 for demo
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  checked: boolean;
  addedBy: string;
}

export interface MealPlan {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: string;
  ingredients: string[];
}

export interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child';
  avatar?: string;
}
