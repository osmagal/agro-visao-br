export interface Product {
  id: number;
  name: string;
  color: string;
  sales: number;
}

export const topProducts: Product[] = [
  { id: 1, name: 'Soybean', color: 'info.main', sales: 88 },
  { id: 2, name: 'Corn', color: 'success.main', sales: 76 },
  { id: 3, name: 'Sugarcane', color: 'secondary.dark', sales: 63 },
  { id: 4, name: 'Coffee', color: 'warning.dark', sales: 54 },
];
