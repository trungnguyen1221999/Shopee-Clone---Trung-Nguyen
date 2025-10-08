const CONST_STATUS = {
  addToCart: -1,
  waitForConfirmation: 1,
  waitForProduct: 2,
  onDelivery: 3,
  deliveried: 4,
  cancelled: 5,
  all: 0,
} as const;

export default CONST_STATUS;
