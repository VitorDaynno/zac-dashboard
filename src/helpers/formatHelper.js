import moment from 'moment';

const formatDate = (datetime) => {
  const date = moment(datetime);
  const formattedDate = date.format('DD/MM/YYYY HH:mm');
  return formattedDate;
};

export { formatDate };
