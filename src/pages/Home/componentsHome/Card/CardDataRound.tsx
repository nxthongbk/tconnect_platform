import { Box, Stack, Typography } from '@mui/material';
import '../../style.scss';
import { ReactElement } from 'react';
type Props = {
  iconName: ReactElement;
  value: number;
  title: string;
  description: string;
};
const CardDataRound = ({ props }: { props: Props }) => {
  return (
    <Box component="div" className="card-data-round-container">
      <Box component={'div'} className="card-round-content">
        <div className="loader">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 66 66"
            height="120px"
            width="120px"
            className="spinner"
          >
            <circle
              stroke="url(#gradient)"
              r="19"
              cy="33"
              cx="33"
              stroke-width="1"
              fill="transparent"
              className="path"
            ></circle>
            <linearGradient id="gradient">
              <stop stop-opacity="1" stop-color="rgba(173, 220, 255, 1)" offset="10%"></stop>
              <stop stop-opacity="0" stop-color="rgba(173, 220, 255, 0)" offset="100%"></stop>
            </linearGradient>
          </svg>
          <span className="span-load"></span>
        </div>
        <Stack spacing={0} alignItems={'center'}>
          {/* <IconPhosphor iconName={props.iconName} size={20} color="#0794FF" /> */}
          {props.iconName}
          <Typography variant="label1" color={'var(--text-primary)'}>
            {props.value}
          </Typography>
        </Stack>
      </Box>
      <Box component={'div'} className="card-rectangular-content">
        <Stack spacing={0} alignItems={'center'}>
          <Typography variant="caption1" color={'var(--text-primary)'} noWrap={true}>
            {props.title}
          </Typography>
          <Typography variant="caption1" color={'var(--text-primary)'} noWrap={true}>
            {props.description}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
export default CardDataRound;
