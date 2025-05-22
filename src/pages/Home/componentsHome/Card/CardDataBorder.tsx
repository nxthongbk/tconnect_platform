import { Box } from '@mui/material';
import '../../style.scss';
import { ReactElement } from 'react';
const CardDataBorder = ({ childrent }: { childrent: ReactElement }) => {
  return (
    <Box component={'div'} className="card-data-border">
      {childrent}
    </Box>
  );
};
export default CardDataBorder;
