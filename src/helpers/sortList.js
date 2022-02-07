export const sortList = (list, key) => {
  list.sort(function (a, b) {
    const valueA = a[key].toUpperCase();
    const valueB = b[key].toUpperCase();

    if (valueA > valueB) {
      return 1;
    }
    if (valueA < valueB) {
      return -1;
    }
    return 0;
  });

  return list;
};
