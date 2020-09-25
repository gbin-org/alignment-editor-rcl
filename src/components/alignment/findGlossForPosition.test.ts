import findGlossForPosition from './findGlossForPosition';
import sampleGlossData from '../shared/sampleData/glossData.sample';

describe('findGlossForPosition', (): void => {
  it('handles linked character (mark 1:2, pos 2)', (): void => {
    const result = findGlossForPosition(sampleGlossData, '41001002', '002');
    expect(result).toEqual('written');
  });
  it('handles unlinked characters (mark 1:2, pos 5)', (): void => {
    const result = findGlossForPosition(sampleGlossData, '41001002', '005');
    expect(result).toEqual('-');
  });
});
