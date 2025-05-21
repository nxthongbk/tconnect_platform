import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import './style.scss';
import { useTranslation } from 'react-i18next';
import IconTag from './componentsHome/IconTag';
import CardTitle from './componentsHome/Card/CardTitle';
import CardDataBorder from './componentsHome/Card/CardDataBorder';
import ChartArea from './componentsHome/Chart/ChartArea';
import CardDataRound from './componentsHome/Card/CardDataRound';
import ProgressLine from './componentsHome/Progress/ProgressLine';
import ProgressColumn from './componentsHome/Progress/ProgressColumn.tsx';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { images } from '../../assets/images/image';
import { ReactElement } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
type TagIconHome = {
  iconName: string;
  data: {
    value: number;
    unit: string;
    description: string;
  };
};
type ProgressType = {
  title: string;
  precent: string;
};
type CardRoundData = {
  iconName: ReactElement;

  value: number;
  title: string;
  description: string;
};
const tagIconHome = [
  {
    iconName: 'ChargingStation',
    data: {
      value: 38,
      unit: 'PCS',
      description: 'Power stations',
    },
  },
  {
    iconName: 'Fan',
    data: {
      value: 1097.03,
      unit: 'MWh',
      description: 'Wind power capacity',
    },
  },
  {
    iconName: 'Lightning',
    data: {
      value: 858.41,
      unit: 'MWh',
      description: 'Instant power',
    },
  },
  {
    iconName: 'GridNine',
    data: {
      value: 858.41,
      unit: 'MWh',
      description: 'PV capacity',
    },
  },
  {
    iconName: 'Sigma',
    data: {
      value: 2609.71,
      unit: 'MWh',
      description: 'Total capacity',
    },
  },
];

const cardRoudData: CardRoundData[] = [
  {
    iconName: <img src={images.iconPV} />,
    title: 'PV investers',
    description: '(Set)',
    value: 5679,
  },
  {
    iconName: <img src={images.iconWind} />,

    title: 'Wind tuition',
    description: '(Set)',
    value: 879,
  },
  {
    iconName: <img src={images.iconTran} />,

    title: 'Transformers',
    description: '(Set)',
    value: 879,
  },
  {
    iconName: <img src={images.iconCoal} />,

    title: 'Coal',
    description: '(million tones)',
    value: 36.26,
  },
  {
    iconName: <img src={images.iconCo2} />,

    title: 'CO2',
    description: '(million tones)',
    value: 90.3,
  },
  {
    iconName: <img src={images.iconTrees} />,

    title: 'Trees',
    description: '(million tones)',
    value: 84.42,
  },
];
const CardPrecent = () => {
  return (
    <Box component={'div'} className="card-precent">
      <Stack spacing={'8px'} alignItems={'center'}>
        <Box component={'div'} height={'150px'} width={'150px'} position={'relative'}>
          <Box
            component={'div'}
            height={'120px'}
            width={'120px'}
            borderTop={'2px solid #0794FF'}
            borderBottom={'1px solid #0794FF'}
            borderRadius={'100%'}
            sx={{
              backgroundImage: `linear-gradient(
              to bottom,
              rgba(0, 58, 102, 1),
              rgba(0, 58, 102, 0)
            )`,
            }}
            position={'absolute'}
            top={'15px'}
            left={'15px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant="h5">85%</Typography>
          </Box>
          <CircularProgressbar
            strokeWidth={6}
            value={90}
            // text={`${60}%`}
            counterClockwise
            styles={buildStyles({
              textColor: 'red',
              pathColor: '#0794FF',
              trailColor: 'transparent',
              rotation: -0.75,
            })}
          />
        </Box>
        <Typography variant="label3" color={'var(--text-primary)'}>
          PC for the month
        </Typography>
      </Stack>
      <Stack spacing={'8px'} alignItems={'center'}>
        <Box component={'div'} height={'150px'} width={'150px'} position={'relative'}>
          <Box
            component={'div'}
            height={'120px'}
            width={'120px'}
            borderTop={'2px solid #0794FF'}
            borderBottom={'1px solid #0794FF'}
            borderRadius={'100px'}
            sx={{
              backgroundImage: `linear-gradient(
                to bottom,
                rgba(0, 58, 102, 1),
                rgba(0, 58, 102, 0)
              )`,
            }}
            position={'absolute'}
            top={'15px'}
            left={'15px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant="h5">70%</Typography>
          </Box>
          <CircularProgressbar
            strokeWidth={6}
            value={70}
            // text={`${60}%`}
            counterClockwise
            styles={buildStyles({
              textColor: 'red',
              pathColor: '#0794FF',
              trailColor: 'transparent',
              rotation: -0.75,
            })}
          />
        </Box>
        <Typography variant="label3" color={'var(--text-primary)'}>
          PC for the year
        </Typography>
      </Stack>
    </Box>
  );
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
const progressList1: ProgressType[] = [
  {
    title: 'Ninh Thuận',
    precent: '100%',
  },
  {
    title: 'Trà Vinh',
    precent: '80%',
  },
  {
    title: 'Ea Nam',
    precent: '70%',
  },
  {
    title: 'Ninh Thuận',
    precent: '60%',
  },
  {
    title: 'Trà Vinh',
    precent: '10%',
  },
];
const Marker = ({ id }: { id: string }) => {
  return (
    <Box component={'div'} className="round-1" id={id}>
      <Box component={'div'} className="round-2">
        <Box component={'div'} className="round-3"></Box>
      </Box>
    </Box>
  );
};

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <Box component={'div'} className="home_page_background">
      <Container maxWidth={'oversize'}>
        <Typography variant="h4">{t('header.overview')}</Typography>

        <Box
          component={'div'}
          display={'flex'}
          width={'100%'}
          justifyContent={'space-between'}
          m={'24px 0px'}
          height={'64px'}
        >
          <Box component={'div'} display={'flex'}>
            {tagIconHome.map((item: TagIconHome, idx: number) => {
              if (++idx % 2 !== 0)
                return <IconTag data={item.data} iconName={item.iconName} key={idx} />;
            })}
          </Box>
          <Box component={'div'} display={'flex'}>
            {tagIconHome.map((item: TagIconHome, idx: number) => {
              if (++idx % 2 === 0)
                return <IconTag data={item.data} iconName={item.iconName} key={idx} />;
            })}
          </Box>
        </Box>
        <Grid container justifyContent={'space-between'}>
          <Grid item width={'450px'}>
            <Grid container rowGap={'22px'}>
              <Grid item width={'100%'} display={'flex'} columnGap={'10px'}>
                <CardDataBorder
                  childrent={
                    <Stack spacing={1} alignItems={'center'}>
                      <Typography variant="label2" color={'var(--text-primary)'}>
                        1563.78 MWh
                      </Typography>
                      <Typography variant="caption1" color={'var(--text-secondary)'}>
                        Daily power
                      </Typography>
                    </Stack>
                  }
                />
                <CardDataBorder
                  childrent={
                    <Stack spacing={1} alignItems={'center'}>
                      <Typography variant="label2" color={'var(--text-primary)'}>
                        7563.78 MWh
                      </Typography>
                      <Typography variant="caption1" color={'var(--text-secondary)'}>
                        Monthly power
                      </Typography>
                    </Stack>
                  }
                />
                <CardDataBorder
                  childrent={
                    <Stack spacing={1} alignItems={'center'}>
                      <Typography variant="label2" color={'var(--text-primary)'}>
                        13563.7 MWh
                      </Typography>
                      <Typography variant="caption1" color={'var(--text-secondary)'}>
                        Yearly power
                      </Typography>
                    </Stack>
                  }
                />
              </Grid>
              <Grid item width={'100%'}>
                <CardTitle title="instant-power" />
              </Grid>
              <Grid item width={'100%'}>
                <ChartArea />
              </Grid>
              <Grid item width={'100%'}>
                <CardTitle title="monthly-equi" />
              </Grid>
              <Grid item width={'100%'} display="flex" justifyContent={'space-between'}>
                {progressList1.map((item: ProgressType, idx: number) => {
                  return <ProgressColumn key={idx} props={item} />;
                })}
              </Grid>

              <Grid item width={'100%'} mt={'20px'}>
                <CardTitle title="total-carbon-reduction" />
              </Grid>
              <Grid item width={'100%'} display={'flex'} justifyContent={'space-between'}>
                <CardDataRound props={cardRoudData[3]} />
                <CardDataRound props={cardRoudData[4]} />

                <CardDataRound props={cardRoudData[5]} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            width={'750px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            position={'relative'}
          >
            <Box
              sx={{
                backgroundImage: `url(${images.mapBgColor})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                height: '150%',
                width: '100%',
                position: 'absolute',
              }}
            ></Box>
            <Box component={'div'} className="home-page-map-vn">
              <Xwrapper>
                <img
                  src={images.markEndCenter}
                  width={'35px'}
                  height={'30px'}
                  id="mark-end-center"
                />
                <img src={images.markEnd} width={'45px'} height={'60px'} id="mark-end" />

                <Marker id="marker-1" />
                <Marker id="marker-2" />
                <Marker id="marker-3" />
                <Marker id="marker-4" />
                <Marker id="marker-5" />
                <Marker id="marker-6" />

                <Marker id="marker-7" />

                <Marker id="marker-8" />

                <Xarrow
                  start={'marker-1'}
                  end="mark-end"
                  showHead={false}
                  lineColor={'#42F0DBB2'}
                  strokeWidth={2}
                />
                <Xarrow
                  start={'marker-2'}
                  end="mark-end"
                  showHead={false}
                  lineColor={'#42F0DBB2'}
                  strokeWidth={2}
                />
                <Xarrow
                  start={'marker-3'}
                  end="mark-end"
                  showHead={false}
                  lineColor={'#42F0DBB2'}
                  strokeWidth={2}
                />

                <Xarrow
                  start={'marker-4'}
                  end="mark-end"
                  showHead={false}
                  lineColor={'#42F0DBB2'}
                  strokeWidth={2}
                />

                <Xarrow
                  start={'marker-5'}
                  end="mark-end"
                  showHead={false}
                  lineColor={'#42F0DBB2'}
                  strokeWidth={2}
                />
                <Xarrow
                  start={'marker-6'}
                  end="mark-end"
                  showHead={false}
                  lineColor={'#42F0DBB2'}
                  strokeWidth={2}
                />

                <Xarrow
                  start={'marker-7'}
                  end="mark-end"
                  showHead={false}
                  lineColor={'#42F0DBB2'}
                  strokeWidth={2}
                />
                <Xarrow
                  start={'marker-8'}
                  end="mark-end"
                  showHead={false}
                  lineColor={'#42F0DBB2'}
                  strokeWidth={2}
                />

                <div className="dot-line-1"></div>
                <div className="dot-line-2"></div>
                <div className="dot-line-3"></div>
                <div className="dot-line-4"></div>
                <div className="dot-line-5"></div>
                <div className="dot-line-6"></div>
                <div className="dot-line-7"></div>
                <div className="dot-line-8"></div>
              </Xwrapper>
            </Box>
          </Grid>
          <Grid item width={'450px'}>
            <Grid container rowGap={'22px'}>
              <Grid item width={'100%'}>
                <CardPrecent />
              </Grid>
              <Grid item width={'100%'}>
                <CardTitle title="pr-top-5" />
              </Grid>

              <Grid item width={'100%'}>
                <Stack spacing={2}>
                  {progressList.map((item: ProgressType, idx: number) => {
                    return <ProgressLine props={item} key={idx} idx={idx} />;
                  })}
                </Stack>
              </Grid>
              <Grid item width={'100%'}>
                <CardTitle title="device-statistics" />
              </Grid>
              <Grid item width={'100%'} display={'flex'} justifyContent={'space-between'}>
                <CardDataRound props={cardRoudData[0]} />
                <CardDataRound props={cardRoudData[1]} />

                <CardDataRound props={cardRoudData[2]} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default HomePage;
