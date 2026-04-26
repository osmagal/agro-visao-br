import { Box, List, Stack, Toolbar } from '@mui/material';
import sitemap from 'routes/sitemap';
import LogoHeader from './LogoHeader';
import NavItem from './NavItem';
import { useTranslation } from 'react-i18next';

const NavItems = () => {
  // 1. O hook de tradução vem para cá, onde a lista é iterada
  const { t } = useTranslation();

  return (
    <List
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {sitemap.map((navItem) => (
        // 2. Interceptamos o item e traduzimos a propriedade de texto dele
        <NavItem
          key={navItem.id}
          item={{
            ...navItem,
            // ATENÇÃO: Troque "name" para a propriedade correta que você usa no sitemap.ts (pode ser "title", "label", etc.)
            name: t(navItem.name)
          }}
        />
      ))}
    </List>
  );
};

const SidebarContent = () => {
  // O hook foi removido daqui pois não há textos soltos neste bloco

  return (
    <>
      <Toolbar disableGutters>
        <LogoHeader />
      </Toolbar>

      <Box
        sx={(theme) => ({
          px: 5,
          height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
          overflowY: 'auto',
        })}
      >
        <Stack gap={17} py={4}>
          <NavItems />
        </Stack>
      </Box>
    </>
  );
};

export default SidebarContent;