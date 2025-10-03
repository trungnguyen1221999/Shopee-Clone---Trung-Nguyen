const soldFormat = (sold: number): string => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(sold)
    .toLocaleLowerCase();
};

export default soldFormat;
