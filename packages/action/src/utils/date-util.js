function formatDate(date) {
  return `${date.getFullYear()}${`0${date.getMonth() + 1}`.slice(
    -2
  )}${`0${date.getDate()}`.slice(-2)}`;
}

module.exports = { formatDate };
