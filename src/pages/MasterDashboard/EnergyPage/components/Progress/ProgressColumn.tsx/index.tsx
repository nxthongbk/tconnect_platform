import { Box, Typography } from '@mui/material';
import '../../../style.scss';
type Props = {
  title: string;
  precent: string;
};
const ProgressColumn = ({ props }: { props: Props }) => {
  return (
    <Box component={'div'} className="progress_column-container">
      <Box component={'div'} className="progress_column-container-precent">
        <Box component={'div'} className="precent-container">
          <Box component={'div'} className="precent-value">
            <Typography variant="label4" color={'var(--text-primary)'}>
              {props.precent}
            </Typography>
          </Box>

          <Box
            component={'div'}
            className="precent-column"
            height={props.precent}
          ></Box>
        </Box>
        <Box component={'div'} className="border">
          <Box component={'div'} className="background"></Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="caption1" color={'var(--text-primary)'}>
          {props.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressColumn;
