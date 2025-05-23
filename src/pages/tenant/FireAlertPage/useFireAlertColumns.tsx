import { Check, X } from '@phosphor-icons/react';
import { GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';
import { Divider, Stack, Typography } from '@mui/material';
import ActionMenu from '~/components/ActionMenu';
import EllipsisTypography from '~/components/EllipsisTypography';
import { FormatTime } from '~/utils/formatDateTime';
import StatusChip from '~/components/StatusChip';
import { AlarmStatus } from './utils';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const renderHeader = (params: GridColumnHeaderParams) => (
  <Typography variant='label3'>{params.colDef.headerName}</Typography>
);

export function useFireAlertColumns(onDetail, onSkip, onVerify, isLaptop, hasEdit) {
  const [fireAlertTranslate] = useTranslation('', { keyPrefix: 'fire-alerts-page' });

  const menuOptions = useMemo(
    () => (alarmLocationId) =>
      hasEdit
        ? [
            {
              icon: <Check size={20} />,
              title: fireAlertTranslate('verify'),
              onClick: () => {
                onVerify(alarmLocationId);
              }
            },
            {
              icon: <X size={20} />,
              title: fireAlertTranslate('skip'),
              onClick: () => {
                onSkip(alarmLocationId);
              }
            }
          ]
        : [],
    [fireAlertTranslate, onSkip, onVerify]
  );

  const columns: GridColDef[] = useMemo(() => {
    return [
      {
        field: 'code',
        headerName: 'ID',
        editable: false,
        sortable: false,
        headerClassName: 'table-grid__header',
        width: 80,
        renderHeader
      },
      {
        field: 'location',
        headerName: fireAlertTranslate('location'),
        editable: false,
        sortable: false,
        headerClassName: 'table-grid__header',
        flex: 4.8,
        minWidth: 180,
        renderHeader,
        renderCell(params) {
          return (
            <EllipsisTypography lines={2} variant='label3'>
              {params.value}
            </EllipsisTypography>
          );
        }
      },
      {
        field: 'startTime',
        headerName: fireAlertTranslate('start'),
        editable: false,
        sortable: false,
        headerClassName: 'table-grid__header',
        width: 180,
        renderHeader,
        renderCell: (params) => FormatTime(params.value)
      },
      {
        field: 'endTime',
        headerName: fireAlertTranslate('end'),
        editable: false,
        sortable: false,
        headerClassName: 'table-grid__header',
        width: 180,
        renderHeader: (params) => {
          if (isLaptop) return <Typography variant='label3'>{params.colDef.headerName}</Typography>;
          return (
            <Stack>
              <Typography variant='label3'>{fireAlertTranslate('start')}</Typography>
              <Typography variant='label3'>{fireAlertTranslate('end')}</Typography>
            </Stack>
          );
        },
        renderCell: (params) => {
          const endTime = params.value ? FormatTime(params.value) : '-';
          if (isLaptop) {
            if (params.row.status === AlarmStatus.ALARM) return '-';
            return endTime;
          }
          return (
            <Stack>
              <Typography variant='body3'>{FormatTime(params.row.startTime)}</Typography>
              <Divider
                sx={{
                  borderBottom: '1px solid var(--border-color)',
                  width: '100%'
                }}
              />
              <Typography variant='body3'>{params.row.status === AlarmStatus.ALARM ? '-' : endTime}</Typography>
            </Stack>
          );
        }
      },
      {
        field: 'verify',
        headerName: fireAlertTranslate('verify'),
        editable: false,
        sortable: false,
        headerClassName: 'table-grid__header',
        width: 180,
        renderHeader,
        renderCell: (params) => {
          const { verifyAt, verifyBy, status } = params.row;
          if ([AlarmStatus.ALARM, AlarmStatus.PENDING].includes(status)) return '-';
          return (
            <Stack className='w-full'>
              <Typography variant='body3'>{FormatTime(verifyAt)}</Typography>
              <Typography variant='caption1'>{verifyBy}</Typography>
            </Stack>
          );
        }
      },
      {
        field: 'status',
        headerName: fireAlertTranslate('status'),
        editable: false,
        sortable: false,
        headerClassName: 'table-grid__header',
        width: 150,
        renderHeader,
        renderCell: (params) => <StatusChip status={params.value} />
      },

      {
        field: 'actions',
        headerName: fireAlertTranslate('action'),
        editable: false,
        sortable: false,
        headerClassName: 'table-grid__header',
        width: 186,
        renderHeader,
        renderCell: (params) => {
          const showMenuOptions = [AlarmStatus.PENDING, AlarmStatus.ALARM].includes(params.row.status);
          return (
            <ActionMenu
              label={fireAlertTranslate('view-info')}
              onClick={() => onDetail(params.row.id)}
              menuOptions={showMenuOptions ? menuOptions(params.row.id) : []}
            />
          );
        }
      }
    ];
  }, [fireAlertTranslate, isLaptop, menuOptions, onDetail]);
  return { columns };
}
