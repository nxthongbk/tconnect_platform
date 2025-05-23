import { Box, Drawer, Tab, Tabs, Typography } from '@mui/material';
import { Check, X } from '@phosphor-icons/react';
import ButtonCustom from '~/components/ButtonCustom';
import TabAlertDevice from '../DrawerAlert/TenantView/TabAlertDevice';
import TabInfo from '../DrawerAlert/TenantView/TabInfo';
import { useState } from 'react';
import { AlarmStatus } from '../utils';
import { useGetAlarmLocationByAlarmLocationId } from '../handleApi';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className={`flex-1 ${value === index ? ' flex' : 'hidden'}`}
      role='tabpanel'
      // hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className='flex-1 flex'>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function PopupAlertInfor({
  open,
  alarmLocationId,
  onClose,
  onSkip,
  onVerify,
  tenantCode,
  hasEdit
}: Readonly<{
  open: boolean;
  alarmLocationId: string;
  onClose: () => void;
  onVerify: (alarmLocationId: string) => void;
  onSkip: (alarmLocationId: string) => void;
  tenantCode: string;
  hasEdit: boolean;
}>) {
  const [fireAlertTranslate] = useTranslation('', { keyPrefix: 'fire-alerts-page' });
  const [value, setValue] = useState(0);
  const { data } = useGetAlarmLocationByAlarmLocationId(alarmLocationId, tenantCode);
  const alarmDetail = data?.data || {};

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSkipAlarm = () => {
    alarmLocationId && onSkip(alarmLocationId);
  };
  const handleVerifyAlarm = () => {
    alarmLocationId && onVerify(alarmLocationId);
  };

  const showAlarmAction =
    hasEdit && alarmDetail ? [AlarmStatus.ALARM, AlarmStatus.PENDING].includes(alarmDetail.status) : false;
  return (
    <>
      <Drawer open={open} onClose={onClose} anchor='right'>
        <Box sx={{ width: 1024 }} className='p-6 gap-4 flex flex-col flex-1' role='presentation'>
          <div className='h-10 flex justify-between items-start'>
            <Typography variant='h4'>{fireAlertTranslate('warning')}</Typography>
            {showAlarmAction && (
              <div className='flex gap-4'>
                <ButtonCustom onClick={handleSkipAlarm} variant='outlined' startIcon={<X />} className='!font-semibold'>
                  <Typography variant='button3'>{fireAlertTranslate('skip')}</Typography>
                </ButtonCustom>
                <ButtonCustom onClick={handleVerifyAlarm} variant='contained' startIcon={<Check />}>
                  <Typography variant='button3'>{fireAlertTranslate('verify')}</Typography>
                </ButtonCustom>
              </div>
            )}
          </div>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label={fireAlertTranslate('info')} {...a11yProps(0)} />
              <Tab label={fireAlertTranslate('alarm-device')} {...a11yProps(1)} />
              <Tab label={'Camera'} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <TabInfo alertDetail={alarmDetail} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TabAlertDevice deviceAlarms={alarmDetail?.alarms || []} />
          </CustomTabPanel>
        </Box>
      </Drawer>
    </>
  );
}
