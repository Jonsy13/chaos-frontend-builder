import moment from 'moment';

// Function to convert UNIX time in format of DD MMM YYY
const formatDate = (date: string) => {
  const updated = new Date(parseInt(date, 10) * 1000).toString();
  const resDate = moment(updated).format('DD MMM YYYY');
  if (date) return resDate;
  return 'Date not available';
};

export default formatDate;
