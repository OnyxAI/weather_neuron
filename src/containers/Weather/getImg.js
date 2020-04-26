import clear from '../../assets/img/clear.png';
import cloud from '../../assets/img/cloud.png';
import cloud1 from '../../assets/img/cloud1.png';
import pikacloud from '../../assets/img/pikacloud.png';
import rain from '../../assets/img/rain.png';
import snowing from '../../assets/img/snowing.png';
import windy from '../../assets/img/windy.png';

export function getImg(weather) {
  let img;

  switch (weather) {
    case 'rain':
      img = rain;
      break;
    case 'clear-day':
      img = clear;
      break;
    case 'thunderstorm':
      img = pikacloud;
      break;
    case 'snow':
      img = snowing;
      break;
    case 'fog':
      img = cloud1;
      break;
    case 'cloudy':
      img = cloud;
      break;
    case 'wind':
      img = windy;
      break;
    default:
      img = clear;
      break;
  }

  return img;
}
