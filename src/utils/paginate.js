import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * 4;
  // If 1st page - (1 - 1) * 4 = 0
  // If 2nd page - (2 - 1) * 4 = 4
  // If 3rd page - (3 - 1) * 4 = 8

  return _(items).slice(startIndex).take(pageSize).value();
}
