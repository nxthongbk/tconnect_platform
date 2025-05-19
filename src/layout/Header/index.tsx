import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import ButtonLanguage from './ButtonLanguage';
import ProfilePopUp from './ProfilePopUp';
import './style.scss';
import { images } from '../../assets/images/image';
import dayjs from 'dayjs';
import IconPhosphor from '../../components/icons';
import SelectProject from './SelectProject';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const lang = localStorage.getItem('cft-language');
  const userJson = localStorage.getItem('userInfo');

  const [tab, setTabs] = useState<string>('/overview');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  // useEffect(() => {
  //   if (
  //     location?.pathname !== '/overview' &&
  //     !location?.pathname.includes('/device') &&
  //     location?.pathname !== '/report'
  //   ) {
  //     setTabs('undefined');
  //   } else if (location?.pathname.includes('/device')) {
  //     setTabs('/devices');
  //   } else {
  //     setTabs(location?.pathname);
  //   }
  // }, [location?.pathname]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeTab = (event: React.SyntheticEvent, value: string) => {
    setTabs(value);
    // navigate(value);
    setAnchorEl(null);
  };

  //language
  const handleChangeLanguage = (value: string) => {
    localStorage.setItem('cft-language', value);
    i18n.changeLanguage(value);
  };

  const tabs = [
    { text: t('header.overview'), value: '/', iconName: 'House' },
    { text: t('header.monitoring'), value: '/monitoring', iconName: 'Monitor' },
    { text: t('header.alarm'), value: '/alarm', iconName: 'BellSimple' },
    { text: t('header.analysis'), value: '/analysis', iconName: 'ChartLine' },
  ];
  const [datew, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };
  const list = () => (
    <Box
      sx={{ width: 250, height: '100%' }}
      role="presentation"
      component={'div'}
      className="drower-sider"
    >
      <List>
        {tabs.map((text, index) => (
          <ListItem key={text.value}>
            <ListItemButton
              sx={{
                borderRadius: '6px',
                backgroundColor: pageNumber === index ? 'var(--blue-500)' : '',
                '&:hover': {
                  backgroundColor: 'var(--blue-500)',
                },
              }}
              onClick={() => {
                navigate(text.value);
                setPageNumber(index);
                toggleDrawer(false);
              }}
            >
              <ListItemIcon>
                <IconPhosphor iconName={text.iconName} size={28} color="#FFFFFF" />
              </ListItemIcon>
              <ListItemText primary={text.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box p={'10px 0px'} bgcolor={'#0c1126'}>
      <Box
        component={'div'}
        className="border-header"
        sx={{ backgroundImage: `url(${images.borderHeader})` }}
      >
        <Container className="header-sticky" maxWidth={'oversize'}>
          <Container className="header-container" maxWidth={false}>
            <Box component={'div'} className="header-component-left">
              <Stack
                direction={'row'}
                spacing={1}
                alignItems={'center'}
                justifyContent={'center'}
                ml={'10px'}
              >
                <Box
                  component={'div'}
                  height={'32px'}
                  width={'32px'}
                  borderRadius={'4px'}
                  bgcolor={'var(--blue-800)'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  onClick={() => toggleDrawer(true)}
                  sx={{ cursor: 'pointer' }}
                >
                  <IconPhosphor iconName="List" size={25} color="#0794FF" />
                </Box>
                <Typography variant="body2">
                  {dayjs(datew).format('DD/MM/YYYY | HH:mm:ss')}
                </Typography>
              </Stack>
            </Box>
            <Box display={'flex'} justifyContent={'center'} position={'absolute'} left={'25%'}>
              <div className="animation-left">
                <IconPhosphor iconName="CaretRight" size={35} weight="bold" className="span" />
                <IconPhosphor iconName="CaretRight" size={35} weight="bold" className="span" />
                <IconPhosphor iconName="CaretRight" size={35} weight="bold" className="span" />
                <IconPhosphor iconName="CaretRight" size={35} weight="bold" className="span" />
              </div>
            </Box>
            <Box display={'flex'} justifyContent={'center'} position={'absolute'} left={'34%'}>
              <Typography variant="h5">TMA-eCloud Smart Energy Management Platform</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'} position={'absolute'} right={'25%'}>
              <div className="animation-right">
                <IconPhosphor iconName="CaretLeft" size={35} weight="bold" className="span" />
                <IconPhosphor iconName="CaretLeft" size={35} weight="bold" className="span" />
                <IconPhosphor iconName="CaretLeft" size={35} weight="bold" className="span" />
                <IconPhosphor iconName="CaretLeft" size={35} weight="bold" className="span" />
              </div>
            </Box>
            <Box component={'div'} className="header-component-right">
              <Stack spacing={3} direction={'row'} alignItems={'center'} mr={'10px'}>
                <SelectProject />
                <ButtonLanguage
                  onClick={() => handleChangeLanguage(lang && lang === 'en' ? 'vi' : 'en')}
                />

                {/* profile */}
                <ProfilePopUp />
              </Stack>
            </Box>
          </Container>
        </Container>
        <Drawer
          anchor={'left'}
          open={openDrawer}
          onClose={() => toggleDrawer(false)}
          id="drawer-container"
        >
          {list()}
        </Drawer>
      </Box>
    </Box>
  );
};
export default Header;
