import {
  GlobeSimple,
  IconWeight,
  ChargingStation,
  Lightning,
  Sigma,
  Sun,
  Wind,
  List,
  House,
  Monitor,
  BellSimple,
  ChartLine,
  CaretDown,
  Fan,
  GridNine,
  CaretRight,
  CaretLeft,
} from '@phosphor-icons/react';
import { FunctionComponent } from 'react';
interface PropsIcon {
  iconName: string;
  size: number;
  weight?: IconWeight;
  color?: string;
  style?: any;
  className?: string;
}

const IconPhosphor: FunctionComponent<PropsIcon> = propsIcon => {
  const { className, color, iconName, size, weight, style } = propsIcon;
  switch (iconName) {
    case 'CaretLeft':
      return (
        <CaretLeft size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;
    case 'CaretRight':
      return (
        <CaretRight size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;
    case 'GridNine':
      return (
        <GridNine size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;
    case 'Fan':
      return <Fan size={size} weight={weight} color={color} style={style} className={className} />;
      break;
    case 'CaretDown':
      return (
        <CaretDown size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;
    case 'BellSimple':
      return (
        <BellSimple size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;
    case 'Monitor':
      return (
        <Monitor size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;
    case 'ChartLine':
      return (
        <ChartLine size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;
    case 'House':
      return (
        <House size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;
    case 'List':
      return <List size={size} weight={weight} color={color} style={style} className={className} />;
      break;
    case 'GlobeSimple':
      return (
        <GlobeSimple
          size={size}
          weight={weight}
          color={color}
          style={style}
          className={className}
        />
      );
      break;
    case 'ChargingStation':
      return (
        <ChargingStation
          size={size}
          weight={weight}
          color={color}
          style={style}
          className={className}
        />
      );
      break;
    case 'Lightning':
      return (
        <Lightning size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;
    case 'Sun':
      return <Sun size={size} weight={weight} color={color} style={style} className={className} />;
      break;
    case 'Wind':
      return <Wind size={size} weight={weight} color={color} style={style} className={className} />;
      break;
    case 'Sigma':
      return (
        <Sigma size={size} weight={weight} color={color} style={style} className={className} />
      );
      break;

    default:
      return (
        <GlobeSimple
          size={size}
          weight={weight}
          color={color}
          style={style}
          className={className}
        />
      );
      break;
  }
};
export default IconPhosphor;

IconPhosphor.defaultProps = {
  className: '',
  color: 'var(--primary)',
  iconName: 'GlobeSimple',
  size: 20,
  style: {},
  weight: 'regular',
};
