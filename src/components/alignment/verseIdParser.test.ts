import { Manuscript, VerseIdParser, getVerseNumberByBookAndChapter } from './verseIdParser';

describe('VerseIDParser', (): void => {
  const parser = new VerseIdParser();

  describe('Logos reference parsing', (): void => {
    it('handles Genesis 1:1', (): void => {
      const result = parser.parse('Bible:Ge 1:1');
      expect(result).toBeTruthy();
      expect(result).toEqual('01001001');
    });

    it('handles Psalm 90:17', (): void => {
      const result = parser.parse('Bible:Ps 90:17');
      expect(result).toBeTruthy();
      expect(result).toEqual('19090017');
    });

    it('handles Jeremiah 20:17', (): void => {
      const result = parser.parse('Bible:Je 20:17');
      expect(result).toBeTruthy();
      expect(result).toEqual('24020017');
    });

    it('handles Hebrews 11:16', (): void => {
      const result = parser.parse('Bible:Heb 11:16');
      expect(result).toBeTruthy();
      expect(result).toEqual('58011016');
    });

    it('handles Jude 1:22', (): void => {
      const result = parser.parse('Bible:Jud 1:22');
      expect(result).toBeTruthy();
      expect(result).toEqual('65001022');
    });

    it('throws on 1 Enoch 1:1', (): void => {
      expect((): void => {
        parser.parse('Bible:1En 1:1');
      }).toThrowError('Cannot find reference to: 1En.');
    });

    it('throws on not Logos input', (): void => {
      expect((): void => {
        parser.parse('John 3:16');
      }).toThrowError('Cannot parse reference: John 3:16');
    });
  });

  describe('GBI Abbreivations reference parsing', (): void => {
    it('handles Genesis 1:1', (): void => {
      const result = parser.parseGbiAbbrevs('gn1:1');
      expect(result).toBeTruthy();
      expect(result).toEqual('01001001');
    });

    it('handles Revelation 20:21', (): void => {
      const result = parser.parseGbiAbbrevs('Rev20:21');
      expect(result).toBeTruthy();
      expect(result).toEqual('66020021');
    });

    it('throws on not GBI input', (): void => {
      expect((): void => {
        parser.parseGbiAbbrevs('John 3:16');
      }).toThrowError('Cannot parse GBI abbreviation: John 3:16');
    });
  });

  describe('GbiId parsing', (): void => {
    it('handles Genesis 1:1', (): void => {
      const result = parser.parseGbiId('01001001');
      expect(result).toEqual({ book: '01', chapter: '001', verse: '001' });
    });

    it('handles Rev 20:21', (): void => {
      const result = parser.parseGbiId('66020021');
      expect(result).toEqual({ book: '66', chapter: '020', verse: '021' });
    });

    it('throws on not GBI input', (): void => {
      expect((): void => {
        parser.parseGbiId('John 3:16');
      }).toThrowError('Invalid gbiId.');
    });
  });

  describe('StrongsX prefix', (): void => {
    it('handles Genesis 1:1', (): void => {
      const result = parser.strongsXPrefix('01001001');
      expect(result).toEqual('h');
    });

    it('handles Rev 20:21', (): void => {
      const result = parser.strongsXPrefix('66020021');
      expect(result).toEqual('g');
    });
  });

  describe('Book id identification', (): void => {
    it('handles OT', (): void => {
      const gbiId = '01001001';
      expect(parser.isOT(gbiId)).toBeTruthy();
      expect(parser.isNT(gbiId)).toBeFalsy();
    });
    it('handles Malachi', (): void => {
      const gbiId = '39003001';
      expect(parser.isOT(gbiId)).toBeTruthy();
      expect(parser.isNT(gbiId)).toBeFalsy();
    });
    it('handles NT', (): void => {
      const gbiId = '40001001';
      expect(parser.isOT(gbiId)).toBeFalsy();
      expect(parser.isNT(gbiId)).toBeTruthy();
    });
    it('handles Revelation', (): void => {
      const gbiId = '66022001';
      expect(parser.isOT(gbiId)).toBeFalsy();
      expect(parser.isNT(gbiId)).toBeTruthy();
    });
    it('handles outside of OT/NT', (): void => {
      const gbiId = '67001001';
      expect(parser.isOT(gbiId)).toBeFalsy();
      expect(parser.isNT(gbiId)).toBeFalsy();
    });
  });

  describe('Manuscript identification', (): void => {
    it('handles OT', (): void => {
      const gbiId = '01001001';
      expect(parser.manuscriptId(gbiId)).toEqual(Manuscript.OT);
    });
    it('handles NT', (): void => {
      const gbiId = '40001001';
      expect(parser.manuscriptId(gbiId)).toEqual(Manuscript.NT);
    });
    it('handles outside of OT/NT', (): void => {
      const gbiId = '67001001';
      expect(parser.manuscriptId(gbiId)).toEqual('');
    });
  });

  describe('Versfication Id field identification', (): void => {
    it('handles S1', (): void => {
      expect(parser.versificationFieldId('S1')).toEqual('s1Ids');
    });
    it('handles AAA', (): void => {
      expect(parser.versificationFieldId('AAA')).toEqual('aaaIds');
    });
  });

  describe('readable references', (): void => {
    it('handles Genesis 1:1', (): void => {
      expect(parser.getReadableReferenceForGbiId('01001001')).toEqual({
        book: 'Genesis',
        ref: '1:1',
      });
    });
    it('handles Matthew 5:9', (): void => {
      expect(parser.getReadableReferenceForGbiId('40005009')).toEqual({
        book: 'Matthew',
        ref: '5:9',
      });
    });
    it('handles 1 Chronicles 1:1', (): void => {
      expect(parser.getReadableReferenceForGbiId('13001001')).toEqual({
        book: '1 Chronicles',
        ref: '1:1',
      });
    });
  });

  describe('getVerseNumberByBookAndChapter()', (): void => {
    it('should return verse number', (): void => {
      const bookId = 'Genesis';
      const chapter = 1;
      expect(getVerseNumberByBookAndChapter(bookId, chapter)).toEqual(31);
    });
  });
});
