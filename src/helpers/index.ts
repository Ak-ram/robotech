// Calculate Percentage
export const calculatePercentage = (previousPrice: any, price: any) => {
  if(price < previousPrice) return 0;
  return !!parseFloat(price) && !!parseFloat(previousPrice)
    ? (100 - (previousPrice / price) * 100).toFixed(0)
    : 0;
};
