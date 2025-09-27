const FilterHelper = (dataArr = [], query = '', properties = []) => {

  const queryLower = query.toLowerCase();

  return dataArr.filter(data => {

    if (query) {
      let queryMatched = false;

      properties.forEach(property => {
        const splitted = property.split('.');
        let checkData = data;

        // Traverse nested properties
        for (let i = 0; i < splitted.length; i++) {
          if (checkData) {
            checkData = checkData[splitted[i]];
            // console.log(`checkData at ${splitted[i]}`, checkData);
          }
        }

        if (checkData) {
          if (typeof checkData === 'string') {
            if (checkData.toLowerCase().includes(queryLower)) {
              queryMatched = true;
            }
          } else if (typeof checkData === 'number') {
            if (checkData.toString().includes(queryLower)) {
              queryMatched = true;
            }
          }
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    return true;
  });
};

export const applyPagination = (list, page, rowsPerPage) => list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export default FilterHelper;
