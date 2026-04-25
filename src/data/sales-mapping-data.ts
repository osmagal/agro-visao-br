import { useTheme } from '@mui/material';

export interface SalesMappingDataItem {
  name: string;
  value: number;
  itemStyle: {
    areaColor: string;
  };
}

export const getSalesMappingData = () => {
  const theme = useTheme();

  const salesMappingData: SalesMappingDataItem[] = [
    {
      name: 'Brazil',
      value: 120000,
      itemStyle: { areaColor: theme.palette.red.main },
    },
    {
      name: 'India',
      value: 103000,
      itemStyle: { areaColor: theme.palette.orange.main },
    },
    {
      name: 'China',
      value: 95000,
      itemStyle: { areaColor: theme.palette.secondary.light },
    },
    { name: 'United States', value: 65000, itemStyle: { areaColor: theme.palette.green.dark } },
    {
      name: 'Russia',
      value: 48000,
      itemStyle: { areaColor: theme.palette.info.light },
    },
    {
      name: 'Argentina',
      value: 35000,
      itemStyle: { areaColor: theme.palette.green.darker },
    },
  ];

  return salesMappingData;
};
