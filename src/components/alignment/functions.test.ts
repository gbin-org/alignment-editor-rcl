import * as functions from './functions';

describe('test frontend.ts', (): void => {
  test('strEscape()', (): void => {
    const string = `<><>`;
    const result = `&lt;&gt;&lt;&gt;`;

    const receive = functions.strEscape(string);
    expect(receive).toEqual(result);
  });

  test('parseTheLocationKey()', (): void => {
    const result = functions.parseTheLocationKey('1+2+3|3+2+1');
    expect(result.sourceIndex).toEqual([1, 2, 3]);
    expect(result.targetIndex).toEqual([3, 2, 1]);
  });

  describe('test highlightLinkedWords()', (): void => {
    it('should successfully highlight expected words.', (): void => {
      const word = 'God saw';
      const text = `God saw that the light was good, so God separated the light from the darkness.`;
      const locationKeys = ['2|0+1'];
      const resultExpected =
        '<b>God</b> <b>saw</b> that the light was good , so God separated the light from the darkness .';
      const resultReceived = functions.highlightLinkedWords(
        word,
        text,
        locationKeys
      );
      expect(resultReceived).toEqual(resultExpected);
    });

    it('should fail to highlight expected words, but return the input.', (): void => {
      const word = 'God saw';
      const text = `God saw that the light was good, so God separated the light from the darkness.`;
      const locationKeys = ['2|'];
      try {
        const resultReceived = functions.highlightLinkedWords(
          word,
          text,
          locationKeys
        );
        expect(resultReceived).toEqual(text);
      } catch (error) {
        // console.log(error?.message);
        expect(error?.message).toEqual('Invalid location key.');
      }
    });
  });
});
