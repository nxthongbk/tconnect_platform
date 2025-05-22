import 'mapbox-gl';
import './style.scss';
import  { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  'pk.eyJ1Ijoid2FybG9jay05MTEiLCJhIjoiY2xoYWVndGl1MGd4NzNycGR4bXI4bDRmOCJ9.HbGcar2SuINni-usf3-JFw';
const marker = [
  {
    id: '8270c900-6d68-11ee-a464-7f15a239a4ba',
    type: 'traffic',
    name: 'Street Light 0001',
    long: 106.628546,
    lat: 10.853392,
    state: true,
    wCurrent: 3.4,
  },
  {
    id: '02',
    type: 'traffic',
    name: 'Street Light 0002',
    long: 106.628774,
    lat: 10.852922,
    state: true,
    wCurrent: 2.4,
  },
  {
    id: '03',
    type: 'traffic',
    name: 'Street Light 0003',
    long: 106.629275,
    lat: 10.851946,
    state: true,
    wCurrent: 3.5,
  },
  {
    id: '04',
    type: 'traffic',
    name: 'Street Light 0005',
    long: 106.627865,
    lat: 10.853471,
    state: true,
    wCurrent: 3.0,
  },
  {
    id: '05',
    type: 'traffic',
    name: 'Street Light 0006',
    long: 106.627496,
    lat: 10.853302,
    state: true,
    wCurrent: 2.0,
  },
  {
    id: '06',
    type: 'traffic',
    name: 'Street Light 0007',
    long: 106.626686,
    lat: 10.852857,
    state: true,
    wCurrent: 3.7,
  },
  {
    id: '07',
    type: 'traffic',
    name: 'Street Light 0008',
    long: 106.627806,
    lat: 10.854046,
    state: true,
    wCurrent: 4.0,
  },
  {
    id: '08',
    type: 'traffic',
    name: 'Street Light 0009',
    long: 106.627895,
    lat: 10.854585,
    state: true,
    wCurrent: 3.0,
  },
  {
    id: '09',
    type: 'traffic',
    name: 'Street Light 0010',
    long: 106.628446,
    lat: 10.85448,
    state: true,
    wCurrent: 2.6,
  },
  {
    id: '011',
    type: 'traffic',
    name: 'Street Light 0011',
    long: 106.628809,
    lat: 10.854426,
    state: false,

    wCurrent: 0,
  },
  {
    id: '012',
    type: 'traffic',
    name: 'Street Light 0014',
    long: 106.629263,
    lat: 10.854352,
    state: false,

    wCurrent: 0,
  },
];
function MapCardV3({}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(106.628809);
  const [lat] = useState(10.854426);
  const [zoom] = useState(16);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 19,
      minZoom: 4,
      pitch: 70, // pitch in degrees
      bearing: 10, // bearing in degree
    });
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    map.current.addControl(nav, 'bottom-right');
  }, []);
  useEffect(() => {
    if (map.current) {
      marker?.map((mark) => {
        new mapboxgl.Marker({ rotation: 15 }).setLngLat([mark.long, mark.lat]).addTo(map.current);
      });
    }
  }, []);
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
export default MapCardV3;
