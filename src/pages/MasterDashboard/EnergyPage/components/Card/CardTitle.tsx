import '../../style.scss';
import { Box, Stack, Typography } from '@mui/material';
// import { images } from '../../../../assets/images/image';
import { t } from 'i18next';

const CardTitle = ({ title }: { title: string }) => {
  return (
    <Box component={'div'} className="card-tile-home ">
      <Stack direction={'row'} spacing={1} alignItems="center">
        {/* <img src={images.arrowRight} height={'16px'} width={'16px'} /> */}
        <Typography variant="label2" color={'var(--text-primary)'}>
          {t(`home-page.${title}`)}
        </Typography>
      </Stack>
    </Box>
  );
};
export default CardTitle;
