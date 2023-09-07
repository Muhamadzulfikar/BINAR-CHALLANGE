function sortCarByYearAscendingly(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  console.log(cars);

  // Clone array untuk menghindari side-effect
  // Apa itu side effect?
  const result = [...cars];

  // Tulis code-mu disini
  let i, j;
  let len = result.length;

  let isSwapped = false;

  for (i = 0; i < len; i++) {

    isSwapped = false;

    for (j = 0; j < len -1; j++) {
      if (result[j].year > result[j + 1].year) {
        let temp = result[j]
        result[j] = result[j + 1];
        result[j + 1] = temp;
        isSwapped = true;
      }
    }

    // IF no two elements were swapped
    // by inner loop, then break 
    if (!isSwapped) {
      break;
    }
  }

  // Rubah code ini dengan array hasil sorting secara ascending
  return result;
}
