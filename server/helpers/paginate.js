class Paginate {
  constructor(items, limit = 5) {
    this.items = items;
    this.totalItems = items.length;
    this.limit = limit;
    this.totalPages = Math.ceil(this.totalItems / this.limit);
  }

  listPages() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i += 1) {
      pages.push(i);
    }
    return pages;
  }
  /**
   *
   * @param {number} page - page requested
   * @return {object} - an object that contains recipes and metadata for the page
   */
  getRecipesForPage(page = 1) {
    // check that page is within range
    if (page > this.totalPages) page = this.totalPages;
    if (page < 1) page = 1;
    const offset = (page - 1) * this.limit;
    const recipes = this.items.slice(offset, offset + this.limit);

    return {
      recipes,
      metaData: {
        pages: this.listPages(),
        totalCount: this.totalItems,
        pageSize: recipes.length,
        page,
        last: this.totalPages,
        first: 1
      }
    };
  }
}

export default Paginate;
