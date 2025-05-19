import { Box, Stack, Typography } from '@mui/material';
import '../../style.scss';
type Props = {
  title: string;
  precent: string;
};
const ProgressLine = ({ props, idx }: { props: Props; idx: number }) => {
  return (
    <Stack spacing={2} width="100%">
      <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
        <Stack direction={'row'} spacing={2}>
          <Typography variant="label3" color={'var(--text-secondary)'}>{`0${idx + 1}`}</Typography>

          <Typography variant="label3" color={'var(--text-primary)'}>
            {props.title}
          </Typography>
        </Stack>
        <Typography variant="label3" color={'var(--text-primary)'}>
          {props.precent}
        </Typography>
      </Stack>
      <Box component={'div'} className="progress_line-container">
        <Box component={'div'} className="progress_line-precent" width={props.precent}></Box>
        <Box
          component={'div'}
          className="affter-precent"
          left={`calc(${props.precent} - 10px)`}
        ></Box>
      </Box>
    </Stack>
  );
};

export default ProgressLine;
