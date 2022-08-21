export const calculateTotalCost = (carts) => {
  return carts.reduce((totalCost, items) => {
    return totalCost + items.price;
  }, 0);
};

export const findItemsIDInArray = (arr, targetValue) => {
  return arr.some((items) => items.id === targetValue);
};

export const filterCartItems = (arr, filterValue, operator) => {
  return arr.filter((items) => {
    return operator === "equality"
      ? items.id === filterValue
      : items.id !== filterValue;
  });
};
