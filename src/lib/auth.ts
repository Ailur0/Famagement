import { User } from '@/types';

const USERS_KEY = 'familyhub_users';
const CURRENT_USER_KEY = 'familyhub_current_user';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const signup = (email: string, password: string, name: string, role: 'parent' | 'child' = 'parent'): { success: boolean; error?: string; user?: User } => {
  const users = getUsers();
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already exists' };
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  
  return { success: true, user: newUser };
};

export const login = (email: string, password: string): { success: boolean; error?: string; user?: User } => {
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  return { success: true, user };
};

export const logout = () => {
  setCurrentUser(null);
};
