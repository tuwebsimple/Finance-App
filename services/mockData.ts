import { Transaction } from '../types';

export const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Netflix',
    categoryId: 'cat_5',
    categoryName: 'Entretenimiento',
    amount: -15.99,
    date: 'Hoy, 24 Mar',
    type: 'expense',
    icon: 'movie',
    iconColor: 'bg-red-100 text-red-500'
  },
  {
    id: '2',
    title: 'Supermercado',
    categoryId: 'cat_1',
    categoryName: 'Comestibles',
    amount: -142.50,
    date: 'Hoy, 24 Mar',
    type: 'expense',
    icon: 'shopping_cart',
    iconColor: 'bg-orange-100 text-orange-500'
  },
  {
    id: '3',
    title: 'Nómina Marzo',
    categoryId: 'cat_4',
    categoryName: 'Salario',
    amount: 2800.00,
    date: 'Ayer, 23 Mar',
    type: 'income',
    icon: 'payments',
    iconColor: 'bg-green-100 text-green-600'
  },
  {
    id: '4',
    title: 'Uber',
    categoryId: 'cat_2',
    categoryName: 'Transporte',
    amount: -24.30,
    date: 'Ayer, 23 Mar',
    type: 'expense',
    icon: 'directions_car',
    iconColor: 'bg-purple-100 text-purple-600'
  }
];

export const netWorthData = [
  { name: 'M', value: 124000 },
  { name: 'T', value: 124200 },
  { name: 'W', value: 124100 },
  { name: 'T', value: 124400 },
  { name: 'F', value: 124300 },
  { name: 'S', value: 124500 },
  { name: 'S', value: 124592 },
];

export const monthlyData = [
  { name: 'Sem 1', hogar: 300, ocio: 150 },
  { name: 'Sem 2', hogar: 450, ocio: 200 },
  { name: 'Sem 3', hogar: 320, ocio: 180 },
  { name: 'Sem 4', hogar: 500, ocio: 250 },
];