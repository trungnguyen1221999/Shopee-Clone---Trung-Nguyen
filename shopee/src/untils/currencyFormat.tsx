const currencyFormat = (number: number): string => {
  return new Intl.NumberFormat("de-DE").format(number);
};

export default currencyFormat;
