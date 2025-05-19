import React from 'react';
import IconPhosphor from '../../../../components/icons';
import '../../style.scss';
import { Box, Stack, Typography } from '@mui/material';
type Data = {
  value: number;
  unit: string;
  description: string;
};
const IconTag = ({ iconName, data }: { iconName: string; data: Data }) => {
  return (
    <Box component={'div'} className="tag-home-container">
      <Box component={'div'} className="content-tag-hone">
        <Stack>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography variant="h5" color={'var(--text-primary)'}>
              {data.value}
            </Typography>
            <Typography variant="caption1" color={'var(--text-primary)'}>
              {data.unit}
            </Typography>
          </Stack>
          <Typography variant="body3" color={'var(--text-secondary)'}>
            {data.description}
          </Typography>
        </Stack>
      </Box>
      {/* <Box component={'div'} className="icon-tag-home">
        <IconPhosphor
          iconName={iconName}
          size={24}
          color="#42F0DB"
          weight="duotone"
        />
      </Box> */}
      <div className="cube-loader">
        <div className="cube-top"></div>
        <div className="cube-wrapper">
          <span className="cube-span" style={{ '--i': 0 } as React.CSSProperties}>
            <div className="taco-container">
              <IconPhosphor iconName={iconName} size={30} color="white" weight="duotone" />
            </div>
          </span>
          <span className="cube-span" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="taco-container">
              <IconPhosphor iconName={iconName} size={30} color="white" weight="duotone" />
            </div>
          </span>
          <span className="cube-span" style={{ '--i': 2 } as React.CSSProperties}>
            <div className="taco-container">
              <IconPhosphor iconName={iconName} size={30} color="white" weight="duotone" />
            </div>
          </span>
          <span className="cube-span" style={{ '--i': 3 } as React.CSSProperties}>
            <div className="taco-container">
              <IconPhosphor iconName={iconName} size={30} color="white" weight="duotone" />
            </div>
          </span>
        </div>
      </div>
    </Box>
  );
};

export default IconTag;
