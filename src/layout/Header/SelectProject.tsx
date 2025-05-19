import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField, Typography } from '@mui/material';
import IconPhosphor from '../../components/icons';
type ProgressType = {
  title: string;
  precent: string;
};
const progressList: ProgressType[] = [
  {
    title: 'Điện gió số 5 - Ninh Thuận',
    precent: '100%',
  },
  {
    title: 'Điện gió Đông Hải 1 - Trà Vinh',
    precent: '80%',
  },
  {
    title: 'Điện gió EA Nam',
    precent: '70%',
  },
  {
    title: 'Điện mặt trời Thuận Bắc - Ninh Thuận',
    precent: '60%',
  },
  {
    title: 'Điện mặt trời Trung Nam - Trà Vinh',
    precent: '10%',
  },
];
export default function SelectProject() {
  const [age, setAge] = React.useState('Điện gió số 5 - Ninh Thuận');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 200,
        maxWidth: 200,
        height: '32px',
        border: '1px solid white',
        borderRadius: '6px',
        pl: 1,
        pr: 1,
      }}
      size="small"
      hiddenLabel={true}
    >
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label={false}
        onChange={handleChange}
        defaultValue="ĐIỆN GIÓ SỐ 5 - NINH THUẬN"
        IconComponent={() => <IconPhosphor iconName="CaretDown" size={20} color="white" />}
        sx={{
          border: 'none',
          ':focus': {
            border: 'none',
          },
          '::after': {
            border: 'none',
          },
          ':hover': {
            border: 'none',
          },
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        variant="standard"
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: 'var(--blue-900)',
              padding: 2,
              '& .MuiMenuItem-root': {
                borderRadius: '8px',
              },
            },
          },
        }}
      >
        {progressList.map((item: ProgressType) => (
          <MenuItem value={item.title}>
            <Typography variant="button3">{item.title}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
