/**
 * A function that fetches a list of items for the db and paginates it by default
 * @param {Object} config - configuration to use to query the database Recipe column
 * @param {Object} query - query object in express's request object
 * @param {Object} dbModel - database model to fetch from
 * @returns {Object} - object containing the rows of items and pagination metadata
 */
const fetch = (config = {}, query = {}, dbModel) => {
  const limit = parseInt(query.limit, 10) || 12;
  const page = parseInt(query.page, 10) || 1;

  const offset = (page - 1) * limit;

  return dbModel.findAndCountAll({
    limit,
    offset,
    ...config
  })
    .then(({ count: totalCount, rows }) => {
      const last = Math.ceil(totalCount / limit);
      const pages = [];
      for (let i = 1; i <= last; i += 1) {
        pages.push(i);
      }

      const pagination = {
        pages,
        totalCount,
        pageSize: rows.length,
        page,
        last
      };
      return {
        rows,
        pagination
      };
    });
};

export default fetch;
