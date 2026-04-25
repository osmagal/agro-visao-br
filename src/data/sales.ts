import { SvgIconProps } from '@mui/material';
import OrderIcon from 'components/icons/OrderIcon';
import SalesIcon from 'components/icons/SalesIcon';

export interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColor: string;
  iconBackgroundColor: string;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
}

export const sales: SaleItem[] = [
  {
    label: 'Total Harvest',
    value: '12.4k t',
    growth: '+8%',
    bgColor: 'error.lighter',
    iconBackgroundColor: 'error.main',
    svgIcon: SalesIcon,
  },
  {
    label: 'Field Count',
    value: '320',
    growth: '+5%',
    bgColor: 'warning.lighter',
    iconBackgroundColor: 'error.dark',
    svgIcon: OrderIcon,
  },
  {
    label: 'Average Yield',
    value: '6.2 t/ha',
    growth: '+1.2%',
    bgColor: 'success.lighter',
    iconBackgroundColor: 'success.darker',
    icon: 'ion:leaf',
  },
  {
    label: 'Crop Types',
    value: '8',
    growth: '+0.5%',
    bgColor: 'secondary.lighter',
    iconBackgroundColor: 'secondary.main',
    icon: 'material-symbols:agriculture',
  },
];
