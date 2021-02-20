import moment from 'moment';
import {
  parse,
  add,
  format,
  getDay,
  startOfDay,
  endOfDay,
  formatISO,
  isBefore
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { zonedTimeToUtc } from 'date-fns-tz';

const locale = ptBR;

const formatDatetime = (datetime) => {
  const date = moment(datetime);
  const formattedDate = date.format('DD/MM/YYYY HH:mm');
  return formattedDate;
};

const isSameHour = (first, second) => {
  const firstHour = moment(first).hour();
  const secondHour = moment(second).hour();

  return firstHour === secondHour;
}

const addTime = (datetime, duration) => add(datetime, duration);

const toDatetime = (
    datetime,
    format='dd-MM-yyyy HH:mm:ss',
    referenceDate=new Date()
  ) => {
    const date = parse(datetime, format, referenceDate)
    return date;
}

const formatDate = (datetime) => {
  const date = zonedTimeToUtc(datetime, 'America/Sao_Paulo');
  return format(date, 'P', { locale });
}

const formatTime = (datetime) => {
  const date = zonedTimeToUtc(datetime, 'America/Sao_Paulo');
  return format(date, 'p', { locale });
}

const getDayWeek = (datetime) => getDay(datetime);

const getStartOfDay = (datetime) => startOfDay(datetime);

const getEndOfDay = (datetime) => endOfDay(datetime);

const datetimeToString = (datetime) => formatISO(datetime);

const checkIsBefore = (firstDate, secondDate) =>
  isBefore(firstDate, secondDate);

export {
  formatDatetime,
  formatTime,
  isSameHour,
  addTime,
  toDatetime,
  getDayWeek,
  getStartOfDay,
  getEndOfDay,
  datetimeToString,
  formatDate,
  checkIsBefore,
};
