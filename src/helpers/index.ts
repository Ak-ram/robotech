// Calculate Percentage
export const calculatePercentage = (previousPrice: any, price: any) => {
  return !!parseFloat(price) && !!parseFloat(previousPrice)
    ? (100 - (previousPrice / price) * 100).toFixed(0)
    : 0;
};
