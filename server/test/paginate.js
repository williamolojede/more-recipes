import { expect } from 'chai';
import Paginate from '../helpers/paginate';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

describe('Paginate', () => {
  // const paginate = new Paginate(arr, 3);
  it('should set limit to 5 if not passed while instantiaing', () => {
    const paginate = new Paginate(arr);
    expect(paginate.limit).to.equal(5);
  });

  // it('should create a pagination object', () => {
  //   const paginate = new Paginate(arr);
  //   expect(paginate.limit).to.equal(5);
  // });
  describe('getRecipesForPage', () => {
    const paginate = new Paginate(arr, 3);
    it('should return item for page 1 if page numer is less than 1', () => {
      expect(paginate.getRecipesForPage(-100).metaData.page).to.equal(1);
    });

    it('should return item for page 1 if no page number is provided', () => {
      expect(paginate.getRecipesForPage().metaData.page).to.equal(1);
    });

    it('should return last page if page number is greater than last page', () => {
      const { metaData } = paginate.getRecipesForPage(100);
      expect(metaData.page).to.equal(metaData.last);
    });
  });
});
