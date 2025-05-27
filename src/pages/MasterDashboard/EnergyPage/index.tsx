import { useEffect, useState } from 'react';
import './style.scss';
import { Avatar, Grid, Stack, Typography } from '@mui/material';
import BottomMenu from '~/components/BottomMenu';
import { menuItems } from '~/constants/menuItems';
// import DeviceCard from './components/DeviceCard';
import { useNavigate } from 'react-router-dom';
import CardDataBorder from './components/Card/CardDataBorder';
import CardTitle from './components/Card/CardTitle';
import ChartArea from './components/Chart/ChartArea';
import CardDataRound from './components/Card/CardDataRound';

const EnergyPage = () => {
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const [activeDevice, setActiveDevice] = useState<any>();
  const navigate = useNavigate();

  // 	const cardRoudData: CardRoundData[] = [
  //   {
  //     iconName: <img src={images.iconPV} />,
  //     title: 'PV investers',
  //     description: '(Set)',
  //     value: 5679,
  //   },
  //   {
  //     iconName: <img src={images.iconWind} />,

  //     title: 'Wind tuition',
  //     description: '(Set)',
  //     value: 879,
  //   },
  //   {
  //     iconName: <img src={images.iconTran} />,

  //     title: 'Transformers',
  //     description: '(Set)',
  //     value: 879,
  //   },
  //   {
  //     iconName: <img src={images.iconCoal} />,

  //     title: 'Coal',
  //     description: '(million tones)',
  //     value: 36.26,
  //   },
  //   {
  //     iconName: <img src={images.iconCo2} />,

  //     title: 'CO2',
  //     description: '(million tones)',
  //     value: 90.3,
  //   },
  //   {
  //     iconName: <img src={images.iconTrees} />,

  //     title: 'Trees',
  //     description: '(million tones)',
  //     value: 84.42,
  //   },
  // ];

  // const devices = [
  //   'Wulu-000007',
  //   'Wulu-000008',
  //   'Wulu-000009',
  //   'Wulu-000010',
  //   'Wulu-000010',
  //   'Wulu-000010',
  //   'Wulu-000010',
  // ];

  // const cameraList = [
  //   'CAM-CK-001',
  //   'CAM-CK-002',
  //   'CAM-CK-003',
  //   'CAM-CK-004',
  //   'CAM-CK-005',
  //   'CAM-CK-006',
  // ];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="energy-page">
      <div className="top-bar-wrapper">
        <img src="/src/assets/images/png/Topbar.png" alt="Top Bar" className="top-bar" />

        <div className="top-bar-content">
          <div className="top-bar-date">
            {formattedTime} {formattedDate}
          </div>

          <div className="top-bar-title">Master Dashboard</div>

          <div className="top-bar-controls">
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="country-select"
            >
              <option value="US">USA</option>
              <option value="VN">Vietnam</option>
              <option value="JP">Japan</option>
            </select>

            <Avatar sx={{ width: 25, height: 25 }} alt="User Avatar" />
          </div>
        </div>
      </div>

      <div className="router-layout">
        <div className="left-container">
          <div className="router-overview">
            {/* <h2>Router Overview</h2> */}

            {/* <ul className="device-list">
             
            </ul> */}
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
                    {/* {progressList1.map((item: ProgressType, idx: number) => {
                  return <ProgressColumn key={idx} props={item} />;
                })} */}
                  </Grid>

                  <Grid item width={'100%'} mt={'20px'}>
                    <CardTitle title="total-carbon-reduction" />
                  </Grid>
                  <Grid item width={'100%'} display={'flex'} justifyContent={'space-between'}>
                    {/* <CardDataRound props={cardRoudData[3]} />
                <CardDataRound props={cardRoudData[4]} />

                <CardDataRound props={cardRoudData[5]} /> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className="router-main">
          {/* <h2>MAP BOX</h2> */}
        </div>

        <div className="right-container">
          <div className="search-container">
            <input type="text" placeholder="Search location" className="search-input" />
          </div>
          <div className="router-detail">
            <h2>Router Detail</h2>

            {/* <DeviceCard
							device={{
								name: 'Wulu-000007',
								locationShort: 'QTSC1',
								uuid: '26dcbbb1-f9c9-4638-b8a0-b5b6cfed6',
								locationFull: '12 Quang Trung',
								profile: '192.168.1.23',
								type: 'WULU-MESH',
								waitingTime: '5 mins',
							}}
						/> */}

            <div className="camera-list-container">
              <h2>Camera List</h2>
              <div className="camera-grid">
                {/* {cameraList.map((cam, index) => (
                  <div key={index} className="camera-item">
                    <img src="/src/assets/images/png/device-camera.png" alt={cam} className="camera-icon" />
                    <div className="camera-name">{cam}</div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomMenu
        activePath={location.pathname}
        items={menuItems}
        onMenuClick={path => path && navigate(path)}
      />

      <img src="/src/assets/images/png/Bottombar.png" alt="Bottom Bar" className="bottom-bar" />
    </div>
  );
};

export default EnergyPage;
