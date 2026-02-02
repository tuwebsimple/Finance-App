import { Transaction, Category } from '../types';

const TRANSACTIONS_KEY = 'finanzas_pro_transactions';
const CATEGORIES_KEY = 'finanzas_pro_categories';

// Default categories if none exist
const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'Comida', icon: 'restaurant', color: 'bg-orange-100 text-orange-500', type: 'expense' },
  { id: 'cat_2', name: 'Transporte', icon: 'directions_car', color: 'bg-purple-100 text-purple-600', type: 'expense' },
  { id: 'cat_3', name: 'Vivienda', icon: 'home', color: 'bg-blue-100 text-blue-600', type: 'expense' },
  { id: 'cat_4', name: 'Salario', icon: 'payments', color: 'bg-green-100 text-green-600', type: 'income' },
  { id: 'cat_5', name: 'Entretenimiento', icon: 'movie', color: 'bg-pink-100 text-pink-500', type: 'expense' },
];

export const StorageService = {
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTransaction: (transaction: Transaction) => {
    const current = StorageService.getTransactions();
    const updated = [transaction, ...current];
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
  },

  getCategories: (): Category[] => {
    const data = localStorage.getItem(CATEGORIES_KEY);
    if (!data) {
      // Initialize with defaults if empty
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
      return DEFAULT_CATEGORIES;
    }
    return JSON.parse(data);
  },

  saveCategory: (category: Category) => {
    const current = StorageService.getCategories();
    const updated = [...current, category];
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
  },

  getBalance: () => {
    const transactions = StorageService.getTransactions();
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  },

  getIncome: () => {
    const transactions = StorageService.getTransactions();
    return transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
  },

  getExpense: () => {
    const transactions = StorageService.getTransactions();
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  }
};