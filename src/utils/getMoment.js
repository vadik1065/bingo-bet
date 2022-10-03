import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/ru';

const getMoment = (lang) => {
  if (lang === 'GB') {
    moment.locale('en-gb');
  } else {
    moment.locale(lang);
  }
  return moment;
}

export default getMoment;
