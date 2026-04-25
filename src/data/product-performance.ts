interface ProductPerformanceData {
  id: number;
  assigned: {
    name: string;
    role: string;
  };
  name: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  budget: number;
}

export const rows: ProductPerformanceData[] = [
  {
    id: 1,
    assigned: {
      name: 'Mato Grosso',
      role: 'State',
    },
    name: 'Soybean',
    priority: 'High',
    budget: 18200,
  },
  {
    id: 2,
    assigned: {
      name: 'Paraná',
      role: 'State',
    },
    name: 'Corn',
    priority: 'Medium',
    budget: 14200,
  },
  {
    id: 3,
    assigned: {
      name: 'Goiás',
      role: 'State',
    },
    name: 'Cotton',
    priority: 'High',
    budget: 12300,
  },
  {
    id: 4,
    assigned: {
      name: 'Bahia',
      role: 'State',
    },
    name: 'Citrus',
    priority: 'Medium',
    budget: 9800,
  },
  {
    id: 5,
    assigned: {
      name: 'Rio Grande do Sul',
      role: 'State',
    },
    name: 'Wheat',
    priority: 'Low',
    budget: 8200,
  },
  {
    id: 6,
    assigned: {
      name: 'Minas Gerais',
      role: 'State',
    },
    name: 'Coffee',
    priority: 'High',
    budget: 15600,
  },
  {
    id: 7,
    assigned: {
      name: 'Maranhão',
      role: 'State',
    },
    name: 'Rice',
    priority: 'Medium',
    budget: 9300,
  },
  {
    id: 8,
    assigned: {
      name: 'Pernambuco',
      role: 'State',
    },
    name: 'Sugarcane',
    priority: 'Critical',
    budget: 20500,
  },
  {
    id: 9,
    assigned: {
      name: 'Santa Catarina',
      role: 'State',
    },
    name: 'Apple',
    priority: 'Low',
    budget: 7400,
  },
  {
    id: 10,
    assigned: {
      name: 'Mato Grosso do Sul',
      role: 'State',
    },
    name: 'Sorghum',
    priority: 'Medium',
    budget: 10800,
  },
  {
    id: 11,
    assigned: {
      name: 'Tocantins',
      role: 'State',
    },
    name: 'Beans',
    priority: 'High',
    budget: 10100,
  },
  {
    id: 12,
    assigned: {
      name: 'Pará',
      role: 'State',
    },
    name: 'Cassava',
    priority: 'Medium',
    budget: 6900,
  },
  {
    id: 13,
    assigned: {
      name: 'Ceará',
      role: 'State',
    },
    name: 'Coconut',
    priority: 'Low',
    budget: 6200,
  },
  {
    id: 14,
    assigned: {
      name: 'Rondônia',
      role: 'State',
    },
    name: 'Corn',
    priority: 'High',
    budget: 11500,
  },
];
