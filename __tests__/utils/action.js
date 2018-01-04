import * as utils from '../../app/actions/utils.action';

describe('utils', () => {
  beforeAll(() => {
    jest.genMockFromModule('realm');
  });
  it('should create an action to trigger loading', () => {
    const locs = utils.getStoredLocations();
    expect(locs).toEqual([]);
  });

  it('should detect that location does exist', () => {
    const locs = [{ name: 'Tokyo' }];
    const doesExist = utils.checkLocationExists(locs, 'Tokyo');
    expect(doesExist).toEqual(true);
  });

  it('should detect that location does not exist', () => {
    const locs = [];
    const doesExist = utils.checkLocationExists(locs, 'Tokyo');
    expect(doesExist).toEqual(false);
  });

  it('should detect that location does exist', () => {
    const locs = [{ id: 0 }];
    const doesExist = utils.checkIndexExists(locs, 0);
    expect(doesExist).toEqual(true);
  });

  it('should detect that location does not exist', () => {
    const locs = [];
    const doesExist = utils.checkIndexExists(locs, 0);
    expect(doesExist).toEqual(false);
  });
});
