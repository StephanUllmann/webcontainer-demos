import { useLight } from '../context/LightContext';
import './LightBulb.css';

export default function LightBulb() {
  const { isOn } = useLight();

  return <div className={`light-bulb ${isOn ? 'light-bulb--on' : ''}`}></div>;
}
