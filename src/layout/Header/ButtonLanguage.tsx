import './style.scss';

import { Box } from '@mui/material';
import IconPhosphor from '../../components/icons';

const ButtonLanguage = ({ onClick }: { onClick: (params: any) => any }) => {

  return (
    <Box
      aria-haspopup="true"
      onClick={onClick}
      component={'div'}
      className="btn-language"
      id={'btn-language-header'}
    >
      <IconPhosphor iconName="GlobeSimple" color="#0794FF" size={25} />
    </Box>
  );
};

export default ButtonLanguage;
