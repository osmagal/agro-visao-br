import { SvgIconProps } from '@mui/material';
import paths, { rootPaths } from './paths';
import DashboardIcon from 'components/icons/DashboardIcon';

export interface MenuItem {
  id: number;
  name: string;
  pathName: string;
  path?: string;
  active?: boolean;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
  items?: MenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 1,
    name: 'Overview',
    path: rootPaths.root,
    pathName: 'overview',
    svgIcon: DashboardIcon,
    active: true,
  },
  {
    id: 2,
    name: 'Produção por Cultura',
    path: '#!',
    pathName: 'production-by-crop',
    icon: 'mdi:seedling',
    active: true,
  },
  {
    id: 3,
    name: 'Produção por Região',
    path: '#!',
    pathName: 'production-by-region',
    icon: 'mdi:map-marker-radius',
    active: true,
  },
  {
    id: 4,
    name: 'Safra e Performance',
    path: '#!',
    pathName: 'harvest-performance',
    icon: 'mdi:weather-fog',
    active: true,
  },
  {
    id: 5,
    name: 'Mapa de Produção',
    path: '#!',
    pathName: 'production-map',
    icon: 'mdi:map',
    active: true,
  },
  {
    id: 6,
    name: 'Previsões',
    path: '#!',
    pathName: 'forecasts',
    icon: 'mdi:calendar-star',
    active: true,
  },
];

export default sitemap;
